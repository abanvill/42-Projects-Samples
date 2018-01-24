//
//  UserSampleModel.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/31/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation
import Alamofire

class UserSampleModel {
	
	var id: AnyObject?
	var login: AnyObject?
	var displayName: AnyObject?
	var poolYear: AnyObject?
	var poolMonth: AnyObject?
	
	var url: AnyObject?
	
	var raw_imageURL: AnyObject?
	var imageURL: NSURL?
	
	init(id: Int) {
		self.id = nil
		self.displayName = nil
		self.poolYear = nil
		self.poolMonth = nil
		self.imageURL = nil
		
	}
	
	func fill(response: NSDictionary) {
		
		self.id = response.objectForKey("id")
		self.displayName = response.objectForKey("displayname")
		self.poolYear = response.objectForKey("pool_year")
		self.poolMonth = response.objectForKey("pool_month")
		
		if let existingURL = response.objectForKey("url") {
			if let safeURL = NSURL(string: existingURL as! String) {
				self.url = safeURL
			}
		}
		
		if let existingURL = response.objectForKey("image_url") {
			if let safeURL = NSURL(string: existingURL as! String) {
				self.imageURL = safeURL
			}
		}
	}

}