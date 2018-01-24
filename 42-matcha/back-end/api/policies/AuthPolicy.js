'use strict'

const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId

module.exports = {

  isNotSigned: function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token)
      return (res.redirect('/'))
    else
      next()
  },

  isSigned: function (req, res, next) {
    var response = {
      sucess: false,
      errors: []
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
      try {
        jwt.verify(token, req.app.get('tokenSecret'), function (err, token) {
          if (err)
          {
            console.error(err)
            response.errors.push(err.message)
            return (res.status(400).send(response))
          }
          else
          {
            req.app.db.collection('user')
              .findOne({ _id: new ObjectId(token._id) })
              .then((result) => {
                if (result && result.is_active === true)
                  next()
                else if (!result)
                {
                  response.errors.push('user not found')
                  return (res.status(404).send(response))
                }
                else
                {
                  response.errors.push('is not active')
                  return (res.status(403).send(response))
                }
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push('user not found')
                return (res.status(404).send(response))
              })
          }
        })
      } catch (e) {
        response.errors.push(e.message)
        return (res.status(401).send(response))
      }
    }
    else
    {
      response.errors.push('no token provided')
      return (res.status(401).send(response))
    }
  },

  isRegistered: function (req, res, next) {
    var response = {
      sucess: false,
      errors: []
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    // console.log('URL: ', req.originalUrl)
    // console.log('Encoded token: ', token)
    if (token)
    {
      try {
        jwt.verify(token, req.app.get('tokenSecret'), function (err, token)
        {
          // console.log('Decoded token: ', token)
          if (err)
          {
            console.error(err)
            response.errors.push(err.message)
            return (res.status(400).send(response))
          }
          else
            next()
        })
      } catch (e) {
        response.errors.push(e.message)
        return (res.status(401).send(response))
      }
    }
    else
    {
      response.errors.push('no token provided.')
      return (res.status(401).send(response))
    }
  },

  isAdmin: function (req, res, next) {
    var response = {
      sucess: false,
      errors: []
    }
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    // console.log('URL: ', req.originalUrl)
    // console.log('Encoded token: ', token)
    if (token)
    {
      try {
        jwt.verify(token, req.app.get('tokenSecret'), function (err, token)
        {
          // console.log('Decoded token: ', token)
          if (err)
          {
            console.error(err)
            response.errors.push(err.message)
            return (res.status(400).send(response))
          }
          else
          {
            req.app.db.collection('user')
              .findOne({ _id: new ObjectId(token._id) })
              .then((result, err) => {
                if (err)
                  throw (err)
                if (result && result.is_admin === true)
                  next()
                else
                {
                  response.errors.push('is not an administrator')
                  return (res.status(403).send(response))
                }
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push('user not found')
                return (res.status(404).send(response))
              })
          }
        })
      } catch (e) {
        response.errors.push(e.message)
        return (res.status(401).send(response))
      }
    }
    else
    {
      response.errors.push('no token provided')
      return (res.status(401).send(response))
    }
  }
}
