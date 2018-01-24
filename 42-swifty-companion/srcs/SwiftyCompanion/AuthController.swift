//
//  AuthController.swift
//  SwiftyCompanion
//
//  Created by Anthony BANVILLE on 10/24/16.
//  Copyright © 2016 Anthony BANVILLE. All rights reserved.
//

import Foundation
import p2_OAuth2
import Alamofire

class AuthController {
	
	fileprivate let service = AuthModel.sharedInstance
	fileprivate var client: OAuth2CodeGrant? = nil
	fileprivate var sessionManager: SessionManager? = nil
	
	static var sharedInstance = AuthController()
	
	func getClient() -> OAuth2CodeGrant? {
		return self.client
	}
	
	func getSessionManager() -> SessionManager? {
		return self.sessionManager
	}
	
	func initAuthentication() {
		
		if self.client == nil {
			
			let settings = [
				"client_id": service.getConsumerKey(),
				"client_secret": service.getConsumerSecret(),
				"authorize_uri": service.getAuthorizeURI(),
				"token_uri": service.getTokenURI(),
				"scope": service.getScope(),
				"redirect_uris": [service.getRedirectURI()],
				"keychain": true,
				] as OAuth2JSON
		
			self.client = OAuth2CodeGrant(settings: settings)
			self.linkAlamofire(client: self.client!)

			print("AuthController: OAuth client successfully generated")
		}
	}
	
	func initAuthorization(sender: UIViewController) {
		
		if let client = self.client {
			
			client.authorize() { authParameters, error in
				
				if let params = authParameters {

					print("Authorized! Access token is in `oauth2.accessToken`")
					print("Authorized! Additional parameters: \(params)")
					
					RequestController.sharedInstance.requestAuthenticatedUser(sender: sender)

				} else {
					print("Authorization was cancelled or went wrong: \(error)")
				}
			}
		} else {
			debugPrint(self.client ?? "AuthController: Client can't be extracted : Undefined client")
		}
	}
	
	func linkAlamofire(client: OAuth2CodeGrant) {
		
		let sessionManager = SessionManager()
		let retrier = OAuth2RetryHandler(oauth2: client)

		sessionManager.adapter = retrier
		sessionManager.retrier = retrier

		self.sessionManager = sessionManager
	}

	init() {

		service.setConsumerKey("0c9e2e3dea1a1c6fb9c78be126612f5ec763e00077bd5dbf42bb2105bf61a766")
		service.setConsumerSecret("067aad590912d7a760e7e316ebb0ccad50f3c93f4088b887deec247e72385c45")
		service.setBaseURI("https://api.intra.42.fr")
		service.setAuthorizeURI("https://api.intra.42.fr/oauth/authorize")
		service.setTokenURI("https://api.intra.42.fr/oauth/token")
		service.setResponseType("code")
		service.setRedirectURI("swifty-companion://oauth2redirect")
		service.setScope("public")
		service.setKeychainState("true")
		
		self.initAuthentication()
	}
	
}
