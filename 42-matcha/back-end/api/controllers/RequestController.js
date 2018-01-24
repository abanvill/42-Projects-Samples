'use strict'

const xssEscape = require('xss-escape')
const ObjectId = require('mongodb').ObjectId
const TokenService = require('../services/TokenService.js')
const ValidationService = require('../services/ValidationService.js')
const UserModel = require('../models/UserModel.js')

module.exports = {

  none: (req, res, next) => {
    req.app.set('result', {source: undefined, target: undefined})
    next()
  },

  source: (req, res, next) => {
    const db = req.app.db
    const _id = TokenService.getId(req)
    var response = {
      success: false,
      content: [],
      errors: []
    }
    var sourceModel = new UserModel(req.app)

    db.collection('user')
      .findOne({ _id: new ObjectId(_id) })
      .then((result) => {
        if (result)
        {
          sourceModel.hydrateWithDBData(result)
          if (result.is_online !== true) {
            sourceModel
              .updateOnlineStatus(true)
              .update()
          }
          req.app.set('result', {source: sourceModel, target: undefined})
          next()
        }
        else
          throw (new Error('user not found'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push(e.message)
        return (res.status(202).send(response))
      })
  },

  both: (req, res, next) => {
    const db = req.app.db
    const _id = TokenService.getId(req)
    var response = {
      success: false,
      errors: []
    }
    var sourceModel = new UserModel(req.app)
    var targetModel = new UserModel(req.app)

    const unsafeData = (req.params.username) ? req.params.username : (req.body.username) ? req.body.username : undefined
    const username = xssEscape(unsafeData)

    // WARNING
    // CHECK THE VALUE GIVEN
    // DONT FORGET PLEASE

    // console.log('inHTMLEscape: ', xssFilters.inHTMLData(unsafeData))
    // console.log('SingleQuotedEscape: ', xssFilters.uriQueryInSingleQuotedAttr(unsafeData))
    // console.log('DoubleQuotedEscape: ', xssFilters.uriQueryInDoubleQuotedAttr(unsafeData))
    // console.log('UnQuotedEscape: ', xssFilters.uriQueryInUnQuotedAttr(unsafeData))
    // console.log('Safe username', username)

    if (!username || ValidationService.isUsername(username) === false)
      response.errors.push('invalid username')
    if (response.errors.length)
      return (res.status(202).send(response))

    db.collection('user')
      .findOne({ _id: new ObjectId(_id) })
      .then((result) => {
        // console.log('Source user result: ', result)
        if (result)
        {
          sourceModel.hydrateWithDBData(result)
          if (result.is_online !== true) {
            sourceModel
              .updateOnlineStatus(true)
              .update()
          }
          db.collection('user')
            .findOne({ username: username.toLowerCase() })
            .then((result) => {
              // console.log('Target user result: ', result)
              if (result)
              {
                targetModel.hydrateWithDBData(result)
                req.app.set('result', {source: sourceModel, target: targetModel})
                next()
              }
              else
                throw (new Error('target user not found'))
            })
            .catch((e) => {
              console.error(e.name + ': ' + e.message)
              response.errors.push(e.message)
              return (res.status(202).send(response))
            })
        }
        else
          throw (new Error('source user not found'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push(e.message)
        return (res.status(202).send(response))
      })
  }
}
