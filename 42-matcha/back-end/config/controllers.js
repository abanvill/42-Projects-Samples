'use strict'

const directory = '../api/controllers/'

module.exports = {
  auth: require(directory + 'AuthController.js'),
  database: require(directory + 'DatabaseController.js'),
  interest: require(directory + 'InterestController.js'),
  report: require(directory + 'ReportNotificationController.js'),
  request: require(directory + 'RequestController.js'),
  user: {
    action: require(directory + 'UserController.js'),
    data: require(directory + 'UserDataController.js')
  }
}
