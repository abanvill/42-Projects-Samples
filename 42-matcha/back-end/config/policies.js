'use strict'

const directory = '../api/policies/'

module.exports = {
  auth: require(directory + 'AuthPolicy.js')
}
