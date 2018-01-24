//
//  StudentTableViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/28/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit
import Alamofire
import AlamofireImage

class StudentTableViewController: UITableViewController, UISearchBarDelegate {
	
	static let sharedInstance = StudentTableViewController()
	
	var indicator = UIActivityIndicatorView()
	
	var rawStudents = [UserModel]()
	var students = [UserModel]()
	
	@IBOutlet weak var searchBar: UISearchBar!
	@IBOutlet weak var UserProfileButtonOutlet: UIBarButtonItem!

	@IBAction func NavigationBarLogoutAction(_ sender: AnyObject) {
		
		let client = AuthController.sharedInstance.getClient()

		client?.abortAuthorization()
		client?.forgetTokens()

		self.dismiss(animated: true, completion: {});
		ViewController.sharedInstance.navigationController?.pushViewController(ViewController.sharedInstance, animated: true)
	}

	@IBAction func UserProfileButton(_ sender: UIBarButtonItem) {
		
		UserController.selectedUser = UserController.currentUser
		
		if UserController.selectedUser != nil {
			
			let storyboard: UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
			let nextViewController = storyboard.instantiateViewController(withIdentifier: "ProfileViewController") as! ProfileViewController
			
			self.navigationController?.pushViewController(nextViewController, animated: true)
		}
	}
	
    override func viewDidLoad() {
		
        super.viewDidLoad()
		
		self.searchBar.delegate = self
		
//		self.edgesForExtendedLayout = UIRectEdge.All
//		self.tableView.contentInset = UIEdgeInsetsMake(0.0, 0.0, CGRectGetHeight(self.tabBarController!.tabBar.frame), 0.0);
//		self.tableView.contentInset = UIEdgeInsetsMake(0, 0, self.bottomLayoutGuide.length, 0)
		
		students = rawStudents
		
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
	
	override func scrollViewDidScroll(_ scrollView: UIScrollView) {
		
	}
	
	override func viewDidLayoutSubviews() {
		
		super.viewDidLayoutSubviews()
	}
	
	override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
		
	}

	override func viewWillAppear(_ animated: Bool) {

		let blurEffect = UIBlurEffect(style: UIBlurEffectStyle.light)
		let blurView = UIVisualEffectView(effect: blurEffect)
		
		let backgroundImage = UIImage(named: "42WallpaperMin.png")
		let imageView = UIImageView(image: backgroundImage)
		
		imageView.contentMode = .scaleAspectFill
		
		self.tableView.backgroundView = imageView
		self.tableView.autoresizingMask = UIViewAutoresizing.flexibleBottomMargin

		blurView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
		blurView.frame = self.tableView.backgroundView!.bounds
		self.tableView.backgroundView!.addSubview(blurView)
		
		self.indicator = UIActivityIndicatorView(frame: CGRect(x: 0, y: 0, width: 40, height: 40))
		self.indicator.activityIndicatorViewStyle = UIActivityIndicatorViewStyle.white
		self.indicator.center = self.view.center
		self.view.addSubview(indicator)
	}

	override func viewWillDisappear(_ animated: Bool) {
		
	}
	
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return students.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		
		let cellIdentifier = "StudentTableViewCell"
		let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! StudentTableViewCell

        // Configure the cell...
		
		let student = self.students[indexPath.row]
		
		if let downURLData = student.imageURL?.absoluteString {
			
				let downURL = URL(string: downURLData)
				cell.photoImageView.af_setImage(withURL: downURL!, placeholderImage: UIImage(named: "AvatarPlaceholder.png"), filter: nil)
		}
		
		cell.nameLabel.text = student.displayName as? String
		cell.promotionLabel.text = student.poolYear as? String
		
        return cell
    }
	
//	override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
//		return ("Hello you")
//	}
	
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }

	/*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
	
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to toIndexPath: IndexPath) {

    }
	
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
	*/
	
	// MARK: - Interaction
	override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
		
		UserController.selectedUser = self.students[indexPath.row]
		
		if UserController.selectedUser != nil {
			
			let storyboard: UIStoryboard = UIStoryboard(name: "Main", bundle:nil)
			let nextViewController = storyboard.instantiateViewController(withIdentifier: "ProfileViewController") as! ProfileViewController
			
			self.navigationController?.pushViewController(nextViewController, animated: true)
		}
		
	}
	
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
	
	func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
		
//		students = searchText.isEmpty ? rawStudents : rawStudents.filter({
//			return $0.displayName!.lowercaseString.rangeOfString(searchText.lowercaseString) != nil
//		})
//		
//		tableView.reloadData()
	}
	
	func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
	}
	
	func searchBarTextDidEndEditing(_ searchBar: UISearchBar) {
	}
	
	func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
		
		self.indicator.center = self.view.center
		self.indicator.startAnimating()
		self.indicator.hidesWhenStopped = true
		
		RequestController.sharedInstance.requestUsers(searchBar.text!,
		done: { students in
			
			self.students = students
			self.indicator.stopAnimating()
			self.tableView.reloadData()
			
			searchBar.endEditing(true)
		},
		error: { students in
			self.students = students
			self.indicator.stopAnimating()
			self.tableView.reloadData()
		})
	}
	
	// MARK: - UI
	
	override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
		cell.backgroundColor = UIColor(white: 0, alpha: 0.6)
	}

}
