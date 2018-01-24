'use strict'

const xssFilters = require('xss-filters')
const ReportNotificationModel = require('../models/ReportNotificationModel.js')

module.exports = {

  list: (req, res) => {
    const response = {
      success: false,
      content: [],
      errors: []
    }
    const db = req.app.db

    db.collection('report')
      .find()
      .toArray()
      .then((result) => {
        if (result.length)
        {
          response.success = true
          response.content = result
          return (res.status(200).send(response))
        }
        else
        {
          response.errors.push('no report founded')
          return (res.status(202).send(response))
        }
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push(e.message)
        return (res.status(202).send(response))
      })
  },

  update: (req, res) => {
    const response = {
      success: false,
      content: [],
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target
    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')
    const notification = new ReportNotificationModel(req.app)

    const comment = xssFilters.inHTMLData(req.body.comment)
    const type = req.body.type

    console.log('Type: ', type)
    console.log('Req.Body: ', req.body)

    if (isNaN(type) === true)
      response.errors.push({ message: 'invalid type (NaN)' })
    else if (parseInt(type) < 0 || parseInt(type) > 2)
      response.errors.push({ message: 'invalid type' })
    if (response.errors.length)
      return (res.status(202).send(response))

    notification
      .hydrate(type, sourceUsername, targetUsername, comment)
      .update()
      .then((result) => {
        response.success = true
        response.content = result
        return (res.status(200).send(response))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ message: e.message })
        return (response)
      })
  }
}
