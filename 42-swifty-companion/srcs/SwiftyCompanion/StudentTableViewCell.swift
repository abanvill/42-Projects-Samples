//
//  StudentTableViewCell.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/27/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit

class StudentTableViewCell: UITableViewCell {
	
	// MARK: Properties

	@IBOutlet weak var promotionLabel: UILabel!
	@IBOutlet weak var nameLabel: UILabel!
	@IBOutlet weak var photoImageView: UIImageView!
	
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
