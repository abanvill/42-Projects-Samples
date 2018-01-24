//
//  ServiceModel.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/25/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation

class AuthModel {
	
	static let sharedInstance = AuthModel()
	
	fileprivate var serviceParameters = [String:String]()
	fileprivate var embeddedWebView: WebViewController?
	
	func getEmbedded() -> WebViewController? {
		return embeddedWebView
	}
	
	func setEmbedded(_ instance: WebViewController) {
		self.embeddedWebView = instance
	}
	
	func getConsumerKey() -> String {
		return self.serviceParameters["consumerKey"]!
	}
	
	func setConsumerKey(_ comsumerKey: String) {
		self.serviceParameters["consumerKey"] = comsumerKey
	}
	
	func getConsumerSecret() -> String {
		return self.serviceParameters["consumerSecret"]!
	}
	
	func setConsumerSecret(_ comsumerSecret: String) {
		self.serviceParameters["consumerSecret"] = comsumerSecret
	}
	
	func getBaseURI() -> String {
		return self.serviceParameters["baseURI"]!
	}
	
	func setBaseURI(_ baseURI: String) {
		self.serviceParameters["baseURI"] = baseURI
	}
	
	func getAuthorizeURI() -> String {
		return self.serviceParameters["authorizeURI"]!
	}
	
	func setAuthorizeURI(_ authorizeURI: String) {
		self.serviceParameters["authorizeURI"] = authorizeURI
	}
	
	func getTokenURI() -> String {
		return self.serviceParameters["tokenURI"]!
	}
	
	func setTokenURI(_ tokenURI: String) {
		self.serviceParameters["tokenURI"] = tokenURI
	}
	
	func getScope() -> String {
		return self.serviceParameters["scope"]!
	}
	
	func setScope(_ scope: String) {
		self.serviceParameters["scope"] = scope
	}
	
	func getRedirectURI() -> String {
		return self.serviceParameters["redirectURI"]!
	}
	
	func setRedirectURI(_ redirectURI: String) {
		self.serviceParameters["redirectURI"] = redirectURI
	}
	
	func getKeychainState() -> String {
		return self.serviceParameters["keychainState"]!
	}
	
	func setKeychainState(_ keychainState: String) {
		self.serviceParameters["keychainState"] = keychainState
	}
	
	func getResponseType() -> String {
		return self.serviceParameters["responseType"]!
	}
	
	func setResponseType(_ responseType: String) {
		self.serviceParameters["responseType"] = responseType
	}
	
	init() {
		serviceParameters["consumerKey"] = nil
		serviceParameters["consumerSecret"] = nil
		serviceParameters["authorizeURI"] = nil
		serviceParameters["tokenURI"] = nil
		serviceParameters["scope"] = nil
		serviceParameters["redirectURI"] = nil
		serviceParameters["keychainState"] = nil
		serviceParameters["responseType"] = "token"
	}
}
