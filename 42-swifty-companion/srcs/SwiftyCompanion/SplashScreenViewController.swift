//
//  SplashScreenViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 11/3/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit

class SplashScreenViewController: UIViewController {

	@IBOutlet weak var ActivityIndicator: UIActivityIndicatorView!
	
    override func viewDidLoad() {
        super.viewDidLoad()

		ActivityIndicator.hidesWhenStopped = true
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
	
	override func viewWillAppear(_ animated: Bool) {
		ActivityIndicator.startAnimating()
	}
	
	override func viewDidDisappear(_ animated: Bool) {
		ActivityIndicator.stopAnimating()
	}

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
