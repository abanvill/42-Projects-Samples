//
//  ProfileViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/28/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireImage

class ProfileViewController: UIViewController {

	static let sharedInstance = ProfileViewController()
	
	@IBOutlet weak var profileImageOutlet: UIImageView!
	@IBOutlet weak var PoolYearIndice: UILabel!
	@IBOutlet weak var PoolMonthIndice: UILabel!
	@IBOutlet weak var FirstNameIndice: UILabel!
	@IBOutlet weak var LastNameIndice: UILabel!
	@IBOutlet weak var LevelIndice: UILabel!
	@IBOutlet weak var ProgressIndice: UIProgressView!
	@IBOutlet weak var CorrectionPtsIndice: UILabel!
	@IBOutlet weak var WalletPtsIndice: UILabel!
	
	@IBOutlet weak var LocationFloorIndice: UILabel!
	@IBOutlet weak var LocationRangeIndice: UILabel!
	@IBOutlet weak var LocationPlaceIndice: UILabel!
	
	@IBOutlet weak var EmailAddress: UILabel!
	@IBOutlet weak var PhoneNumber: UILabel!
	
	@IBOutlet weak var scrollView: UIScrollView!
	@IBOutlet var mainView: UIView!

	@IBOutlet weak var LocationStackView: UIStackView!
	@IBOutlet weak var OfflineIndice: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
		
        // Do any additional setup after loading the view.
		self.scrollView.contentInset = UIEdgeInsets.zero
		
    }
	
	override func viewWillAppear(_ animated: Bool) {
		
		let backgroundView = UIImageView(frame: UIScreen.main.bounds)
		
		backgroundView.contentMode = UIViewContentMode.scaleAspectFill
		backgroundView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
		backgroundView.image = UIImage(named: "LandscapeBackground.png")
		
		self.scrollView.insertSubview(backgroundView, at: 0)
		self.scrollView.autoresizingMask = UIViewAutoresizing.flexibleBottomMargin
		
		LocationStackView.isHidden = true
		OfflineIndice.isHidden = true

		if let student = UserController.selectedUser {
			
			if let url = student.imageURL?.absoluteString {
				
				let downURL = URL(string: url)
				profileImageOutlet.af_setImage(withURL: downURL!, placeholderImage: UIImage(named: "AvatarPlaceholder.png"), filter: nil)
				
			}
			
			let rawPoolYear = student.poolYear as? String
			let rawPoolMonth = student.poolMonth as? String
			let rawFirstName = student.firstName as? String
			let rawLastName = student.lastName as? String
			let rawLocation = student.location
			let rawCorrectionPts = student.correctionPoint as? Int
			let rawWalletPts = student.walletPoint as? Int
			let rawLevel = student.level as? Int
			let rawProgression = student.progression as? Float
			let rawEmailAddress = student.email as? String
			let rawPhoneNumber = student.phone as? String
			
			if let poolYear = rawPoolYear {
				PoolYearIndice.text = poolYear
			} else {
				PoolYearIndice.text = "Undefined"
			}
			
			if let poolMonth = rawPoolMonth {
				PoolMonthIndice.text = poolMonth.capitalized
			}
			
			if let firstName = rawFirstName {
				FirstNameIndice.text = firstName
			} else {
				PoolYearIndice.text = "Undefined"
			}
			
			if let lastName = rawLastName {
				LastNameIndice.text = lastName
			} else {
				PoolYearIndice.text = "Undefined"
			}
			
			if let location = rawLocation {
				if let floor = location["floor"] {
					LocationFloorIndice.text = floor
				}
				if let range = location["range"] {
					LocationRangeIndice.text = range
				}
				if let place = location["place"] {
					LocationPlaceIndice.text = place
				}
				LocationStackView.isHidden = false
			} else {
				OfflineIndice.isHidden = false
			}
			
			if let level = rawLevel {
				LevelIndice.text = String(level)
			}
			
			if let progression = rawProgression {
				ProgressIndice.setProgress(progression, animated: true)
			}
			
			if let correctionPts = rawCorrectionPts {
				CorrectionPtsIndice.text = String(correctionPts)
			} else {
				CorrectionPtsIndice.text = "*"
			}
			
			if let walletPts = rawWalletPts {
				WalletPtsIndice.text = String(walletPts)
			} else {
				WalletPtsIndice.text = "*"
			}
			
			if let emailAddress = rawEmailAddress {
				EmailAddress.text = emailAddress
			}
			
			if let phoneNumber = rawPhoneNumber {
				PhoneNumber.text = phoneNumber
			}
		}
	}

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
	
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
