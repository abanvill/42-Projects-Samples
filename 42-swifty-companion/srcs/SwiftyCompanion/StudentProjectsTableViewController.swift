//
//  StudentProjectsTableViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 11/2/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit

class StudentProjectsTableViewController: UITableViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
	
	override func viewWillAppear(_ animated: Bool) {
		
		let backgroundImage = UIImage(named: "LandscapeBackground.png")
		let imageView = UIImageView(image: backgroundImage)
		
		imageView.contentMode = .scaleAspectFill
		
		self.tableView.backgroundView = imageView
		self.tableView.autoresizingMask = UIViewAutoresizing.flexibleBottomMargin
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
	
	/*
	override func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? {

	}
	*/

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return (UserController.selectedUser?.projects!.count)!
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "StudentProjectsTableViewCell", for: indexPath) as! StudentProjectsTableViewCell
		
		let projects = UserController.selectedUser?.projects
		let project = projects!.objectAt(indexPath.row) as AnyObject
		
		let projectParameters = project.object(forKey: "project") as AnyObject
		
		if let projectName = (projectParameters.value(forKey: "name") as? String?) {
			
			cell.ProjectTitle.text = projectName!
			
			if let projectStatus = (project.value(forKey: "validated?") as? Bool) {
				
				if let projectMark = (project.value(forKey: "final_mark") as? Float?) {
										
					cell.ProjectPercent.text = String(projectMark!) + "%"
					
					if projectStatus == true {
						cell.ProjectPercent.textColor = UIColor(red: 83/255, green: 212/255, blue: 140/255, alpha: 1)
						
					} else {
						cell.ProjectPercent.textColor = UIColor(red: 204/255, green:0, blue: 0, alpha: 1)
					}
				}
				
			}
		}
		
        // Configure the cell...

        return cell
    }


    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

	// MARK: - UI
	
	override func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
		
		if indexPath.row % 2 == 1 {
			cell.backgroundColor = UIColor(white: 1, alpha: 0.2)
		} else {
			cell.backgroundColor = UIColor(white: 1, alpha: 0.1)
		}
	}
	
}
