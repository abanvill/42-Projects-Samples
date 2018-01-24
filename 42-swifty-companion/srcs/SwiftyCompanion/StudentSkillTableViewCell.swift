//
//  StudentSkillTableViewCell.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 11/2/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import UIKit

class StudentSkillTableViewCell: UITableViewCell {

	@IBOutlet weak var SkillName: UILabel!
	@IBOutlet weak var SkillPercent: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
