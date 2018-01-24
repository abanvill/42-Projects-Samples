//
//  ViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/24/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

	static let sharedInstance = ViewController()

	fileprivate var login: String?
	fileprivate var authenticationController = AuthController.sharedInstance
	
	@IBOutlet weak var LandscapeBackground: UIImageView!
	@IBOutlet weak var connectBTN: UIButton!
	
	@IBAction func connectRequestBTN(_ sender: UIButton) {
		
		sender.isHidden = true
		self.authenticationController.initAuthorization(sender: self)
		sender.isHidden = false
	}
	
	override func viewDidLoad() {
		super.viewDidLoad()
		
		if let client = self.authenticationController.getClient() {
			self.connectBTN.isHidden = true
			if (client.hasUnexpiredAccessToken() == true) {
				RequestController.sharedInstance.requestAuthenticatedUser(sender: self)
				self.connectBTN.isHidden = false
			} else {
				self.connectBTN.isHidden = false
			}
		}
	}
	
	override func viewWillAppear(_ animated: Bool) {
		super.viewWillAppear(animated)
		
		self.connectBTN.layer.borderColor = UIColor(white: 1, alpha: 0.1).cgColor
		self.connectBTN.layer.borderWidth = 1
		self.connectBTN.layer.cornerRadius = 5

	}
	
	override func viewDidAppear(_ animated: Bool) {
		super.viewDidAppear(animated)
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}


}

