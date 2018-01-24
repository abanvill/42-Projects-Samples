//
//  RequestController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/31/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation
import Alamofire
import p2_OAuth2

class RequestController {
	
	static let sharedInstance = RequestController()

	fileprivate var requested: Int = 0
	fileprivate var completed: Int = 0
	
	func requestAuthenticatedUser(sender: UIViewController) {
		
		if let sessionManager = AuthController.sharedInstance.getSessionManager() {
			
			sessionManager.request((AuthModel.sharedInstance.getBaseURI()) + "/v2/me")
				.validate()
				.responseJSON { response in
				
					switch response.result {
						
						case .success:

							let JSON = response.result.value as! NSDictionary
							
							UserController.currentUser.fill(response: JSON) { isParsed in
								
								if (isParsed == true ) {
									debugPrint("RequestController: Current User successfully parsed")
									sender.navigationController!.popViewController(animated: true)
									sender.performSegue(withIdentifier: "SearchViewSegue", sender: sender)
								} else {
									debugPrint("RequestController: Current User parsing failure")
								}
							}

						case .failure(let error):
							debugPrint("RequestController: Request error: \(error)")
					}
			}
		}
	}
	
	func requestUsers(_ searchStr: String, done: @escaping (_ students: [UserModel]) -> Void, error: @escaping (_ students: [UserModel]) -> Void) {
		
		let strLen = searchStr.characters.count
		var subStr = searchStr
		let startIndex = (strLen > 2) ? subStr.characters.index(subStr.startIndex, offsetBy: strLen - 2) : subStr.characters.index(subStr.startIndex, offsetBy: strLen)
	
		subStr = subStr.substring(to: startIndex)
		
		let range = subStr + "," + searchStr
		var students = [UserModel]()
		
		if let sessionManager = AuthController.sharedInstance.getSessionManager() {
			
			sessionManager.request((AuthModel.sharedInstance.getBaseURI()) + "/v2/cursus/" + "42" + "/users", parameters: ["range[login]": range, "sort":"pool_year,login,created_at"])
				.validate()
				.responseJSON { response in
				
					switch response.result {
					
						case .success:
						
							if let JSON = response.result.value {
						
								self.requested = (JSON as! NSArray).count
	
								if (self.requested <= 0) {
									return error(students)
								}
						
								for user in JSON as! NSArray {
								
									let student = UserModel()
									let convertedUser = user as AnyObject
									let convertedUserId = (convertedUser.value(forKey: "id") as AnyObject).int64Value as NSNumber
							
									student.fillById(convertedUserId) { isParsed in
										
										self.completed = self.completed + 1
										
										print("RequestController: Completed \(self.completed) on \(self.requested) requested.")
										
										if (self.completed == self.requested) {
											self.completed = 0
											self.requested = 0
											done(students)
										}
									}
									students.append(student)
								}
							}
					
						case .failure(let error):
							debugPrint("RequestController: Request error: \(error)")
					}
			}
		}
	}
}
