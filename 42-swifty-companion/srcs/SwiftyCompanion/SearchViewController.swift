//
//  SearchViewController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/27/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation
import UIKit

class SearchViewController: UIViewController {
	
	static let sharedInstance = SearchViewController()
	
	@IBOutlet weak var searchBar: UISearchBar!

	// Define the view used to display the search results
	let searchController = UISearchController(searchResultsController: nil)
	
	override func viewDidLoad() {
		super.viewDidLoad()
	}
	
	override func viewDidAppear(_ animated: Bool) {
		super.viewDidAppear(animated)
	}
	
	func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {

	}

	func updateSearchResultsForSearchController(_ searchController: UISearchController) {
		filterContentForSearchText(searchController.searchBar.text!)
	}
	
	func filterContentForSearchText(_ searchText: String, scope: String = "All") {
		
	}

}
