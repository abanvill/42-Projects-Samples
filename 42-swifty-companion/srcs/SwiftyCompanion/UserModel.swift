//
//  UserModel.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/27/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation
import Alamofire

enum Location {
	case location(String)
	case floor(Int)
	case range(Int)
	case cursor(Int)
}

class UserModel {
	
	var complete: Bool = false
	var id: AnyObject?
	var login: AnyObject?
	var displayName: AnyObject?
	var firstName: AnyObject?
	var lastName: AnyObject?
	var level: AnyObject?
	var progression: AnyObject?
	var email: AnyObject?
	var phone: AnyObject?
	var poolYear: AnyObject?
	var poolMonth: AnyObject?
	var correctionPoint: AnyObject?
	var walletPoint: AnyObject?
	var staff: AnyObject?
	
	var raw_location: AnyObject?
	var location: [String:String]?
	
	var url: AnyObject?
	var raw_imageURL: AnyObject?
	var imageURL: URL?
	
	var skills: AnyObject?
	var projects: AnyObject?
	
	init() {
		self.id = nil
		self.displayName = nil
		self.firstName = nil
		self.lastName = nil
		self.level = nil
		self.progression = nil
		self.email = nil
		self.phone = nil
		self.poolYear = nil
		self.poolMonth = nil
		self.correctionPoint = nil
		self.walletPoint = nil
		self.location = nil
		self.url = nil
		self.imageURL = nil
		self.staff = nil
		self.projects = nil
	}
	
	func fillByIdProcess(id: String, done: @escaping (_ isParsed: Bool) -> Void) {
		
		let sessionManager = AuthController.sharedInstance.getSessionManager()
		
		sessionManager?.request((AuthModel.sharedInstance.getBaseURI()) + "/v2/users/" + id)
			.validate()
			.responseJSON { response in
				
				if let JSON = response.result.value {
					self.fill(response: JSON as! NSDictionary, done: done)
				}
		}
	}
	
	func fillById(response: String, done: @escaping (_ isParsed: Bool) -> Void) {
		
		
		self.fillByIdProcess(id: response, done: done)
	}
	
	func fillById(response: AnyObject, done: @escaping (_ isParsed: Bool) -> Void) {
		
		let id = response.stringValue
		
		self.fillByIdProcess(id: id!, done: done)
	}
	
	func fillById(_ response: NSNumber, done: @escaping (_ isParsed: Bool) -> Void) {
		
		let id = response.stringValue
		
		self.fillByIdProcess(id: id, done: done)
	}
	
	func fillById(_ response: NSArray, done: @escaping (_ isParsed: Bool) -> Void) {
		
		if response.count == 0 {
			return
		}
		
		let id = (response as AnyObject).value(forKey: "id")
		
		self.fillByIdProcess(id: id as! String, done: done)
	}
	
	func fill(response: NSDictionary, done: (_ isParsed: Bool) -> Void) {
				
		let global = response as AnyObject
		
		self.id = global.object(forKey: "id") as AnyObject?
		self.login = nil
		self.displayName = global.object(forKey: "displayname") as AnyObject?
		self.firstName = response.object(forKey: "first_name") as AnyObject?
		self.lastName = response.object(forKey: "last_name") as AnyObject?
		self.email = global.object(forKey: "email") as AnyObject?
		self.phone = global.object(forKey: "phone") as AnyObject?
		self.poolYear = global.object(forKey: "pool_year") as AnyObject?
		self.poolMonth = global.object(forKey: "pool_month") as AnyObject?
		self.correctionPoint = global.object(forKey: "correction_point") as AnyObject?
		self.walletPoint = global.object(forKey: "wallet") as AnyObject?
		self.raw_location = global.object(forKey: "location") as AnyObject?
		self.staff = global.object(forKey: "staff") as AnyObject?
		
		if let existingURL = global.object(forKey: "url") {
			if let safeURL = URL(string: existingURL as! String) {
				self.url = safeURL as AnyObject?
			}
		}
		
		if let existingURL = global.object(forKey: "image_url") {
			if let safeURL = URL(string: existingURL as! String) {
				self.imageURL = safeURL
			}
		}
		
		if let tmp = raw_location as? String {
			self.location = self.parseUserLocation(tmp)
		}
		else {
			self.location = nil
		}
		
		if let cursus = global.object(forKey: "cursus_users") {
			
			if let level = (cursus as AnyObject).value(forKey: "level") {
				
				switch level {
					case is Array<Any>:
						
						let extractedArray = level as! Array<Any>
						let extractedValue = extractedArray[0] as! Float
						let extractedProgression = extractedValue.truncatingRemainder(dividingBy: 1.0)
						
						self.level = Int(extractedValue) as AnyObject
						self.progression = extractedProgression as AnyObject

					case is Float:
						print("UserModel: Level is Float type")
					case is String:
						print("UserModel: Level is String type")
					default:
						print("UserModel: Level unrecognized type")
				}
			}
			
			if let skills = (cursus as AnyObject).value(forKey: "skills") {
				
				switch skills {
					case is Array<Any>:
						let extractedArray = skills as! Array<Any>
						let rightArray = extractedArray[0] as AnyObject
						self.skills = rightArray
					default:
						print("UserModel: Skill unrecognized type")
				}
			}
		}
		
		if let projects = global.object(forKey: "projects_users") {
			self.projects = projects as AnyObject
		}
		
		self.complete = true
		done(self.complete)
	}
	
	func parseUserLocation(_ location: String) -> [String:String]? {
		
		var elementsArray = [String:(String, Int)]()
		var resultArray = [String:String]()
	
		var index = 0
		var buffer: String = ""
		
		if (location.characters.count == 6) {
			for i in location.characters
			{
				if index % 2 == 0 {
					buffer = String(i)
				}
				else if index % 2 == 1 {
					switch index {
					case 1: elementsArray["floor"] = (buffer, Int(String(i))!)
					case 3: elementsArray["range"] = (buffer, Int(String(i))!)
					case 5: elementsArray["place"] = (buffer, Int(String(i))!)
					default: continue
					}
					buffer = ""
				}
				index = index + 1
			}
			
			// MARK: Remain unsafe
			
			resultArray["floor"] = String(elementsArray["floor"]!.1)
			resultArray["range"] = String(elementsArray["range"]!.1)
			resultArray["place"] = String(elementsArray["place"]!.1)
			return resultArray
		}

		return nil
		
	}
	
}
