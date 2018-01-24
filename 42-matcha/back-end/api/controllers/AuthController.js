'use strict'

const credentials = {
  client: {
    id: 'bba748d99ca261d9ac47036640f498a7a0c01c62a3cd6caba0a2769297150aa5',
    secret: 'f828c27d1c55c94e35dce200bdcf546f618f053b43158921a958b7c7a3c07144'
  },
  auth: {
    tokenHost: 'https://api.intra.42.fr/'
  }
}

const request = require('request')
const oauth2 = require('simple-oauth2').create(credentials)
const jwt = require('jsonwebtoken')
const humanparser = require('humanparser')
const owasp = require('owasp-password-strength-test')
const xssEscape = require('xss-escape')
const ObjectId = require('mongodb').ObjectId
const UserModel = require('../models/UserModel.js')
const HashService = require('../services/HashService.js')
const MailService = require('../services/MailService.js')
const ValidationService = require('../services/ValidationService.js')
const GeolocationService = require('../services/GeolocationService.js')

owasp.config({
  maxLength: 128,
  minLength: 8,
  minOptionalTestsToPass: 3
})

module.exports = {

  signup: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const db = req.app.db
    const username = (req.body.username) ? xssEscape(req.body.username).toLowerCase() : ''
    const email = (req.body.email) ? xssEscape(req.body.email).toLowerCase() : ''
    const fullName = (req.body.fullName) ? xssEscape(req.body.fullName) : ''
    const password = (req.body.password) ? req.body.password : ''
    const passwordStrength = (password !== undefined) ? owasp.test(password) : { strong: false }

    var firstName
    var lastName

    if (fullName) {
      let parsedName = humanparser.parseName(fullName)
      firstName = parsedName.firstName.toLowerCase()
      lastName = parsedName.lastName.toLowerCase()
    }

    if (!username || ValidationService.isUsername(username) === false)
      response.errors.push({ field: 'username', message: 'invalid format' })
    if (!email || ValidationService.isEmail(email) === false)
      response.errors.push({ field: 'email', message: 'invalid format' })
    if (!firstName || ValidationService.isName(firstName) === false)
      response.errors.push({ field: 'fullName', message: 'invalid format' })
    if (!lastName || ValidationService.isName(lastName) === false)
      response.errors.push({ field: 'fullName', message: 'invalid format' })
    if (password !== req.body.passwordConfirmation)
      response.errors.push({ field: 'passwordConfirmation', message: 'invalid password confirmation' })
    if (passwordStrength.strong === false)
      response.errors.push({ field: 'password', message: 'password is not strong enough' })
    if (response.errors.length)
      return (res.status(202).send(response))

    db.collection('user')
      .findOne({
        $or: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() }
        ]
      })
      .then((result) => {
        if (result)
        {
          console.log('Founded: ', result)
          if (result.username === username)
            response.errors.push({ field: 'username', message: 'username already registered' })
          if (result.email === email)
            response.errors.push({ field: 'email', message: 'email already registered' })
          return (res.status(202).send(response))
        }
        else
        {
          let user = new UserModel(req.app)

          user.hydrateCreationData({
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password
          })
            .create()
            .then((result) => {
              if (result)
              {
                response.success = true
                /*
                ** For development & tests environment
                */
                if (process.env.NODE_ENV === 'dev' && req.body.fixture === req.app.get('fixtureSecret'))
                {
                  result.activate()
                    .update()
                    .then((status) => {
                      console.log(`Test user: ${req.body.username} activated`)
                      jwt.sign({
                        _id: result.getData('_id')
                      }, req.app.get('tokenSecret'), {
                        expiresIn: (60 * 60 * 24) // 24 hours
                      }, function (err, token) {
                        if (err) throw (err)
                        response.token = token
                        return (res.status(200).send(response))
                      })
                    })
                    .catch((e) => {
                      console.error(e)
                      return (res.status(202).send(e.message))
                    })
                }
                else
                {
                  MailService.signup(result.getModelData())
                  return (res.status(200).send(response))
                }
              }
            })
            .catch((e) => {
              console.error(e.name + ': ' + e.message)
              response.errors.push({ field: undefined, message: e.message })
              return (res.status(202).send(response))
            })
        }
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  signin: (req, res) => {
    var response = {
      success: false,
      token: undefined,
      errors: []
    }
    const sourceModel = new UserModel(req.app)
    const db = req.app.db
    const unsafeIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const username = (req.body.username) ? req.body.username.toLowerCase() : ''

    var digest = ''

    db.collection('user')
      .findOne({ username: username })
      .then((result) => {
        if (result)
        {
          digest = HashService.encrypt(req.app.get('saltSecret'), result.salt, req.body.password)
          if (result.is_active !== true)
            throw (new Error('inactive account'))
          if (digest === result.password)
          {
            jwt.sign({
              _id: result._id,
              isSigned: true
            }, req.app.get('tokenSecret'), {
              expiresIn: (60 * 60 * 24) // 24 hours
            }, function (err, token) {
              if (err) throw (err)

              response.token = token
              if (!result.position.is_set)
              {
                GeolocationService.locateByIp(unsafeIp)
                  .then((position) => {
                    sourceModel.hydrateWithDBData(result)
                      .updateOnlineStatus(true)
                      .updatePosition(position)
                      .updateLocation()
                      .update()
                      .then((result) => {
                        console.log('User located by ip')
                        response.success = true
                        return (res.status(200).send(response))
                      })
                      .catch((e) => {
                        console.error(e.name + ': ' + e.message)
                        return (res.status(202).send(response))
                      })
                  })
                  .catch((e) => {
                    console.log(unsafeIp)
                    console.log(e)
                    console.error('Cannot locate by ip')
                    return (res.status(202).send(response))
                  })
              }
              else {
                console.log('User located by address')
                response.success = true
                return (res.status(200).send(response))
              }
            })
          }
          else
            throw (new Error('invalid informations'))
        }
        else
          throw (new Error('invalid informations'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  signout: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source

    sourceModel
      .updateOnlineStatus(false)
      .updateLastConnectionDate()
      .update()
      .then((result) => {
        response.success = true
        return (res.status(200).send(response))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        return (res.status(202).send(response))
      })
  },

  /*
    const tokenTemplate = {
      'token': {
        'access_token': 'fe8f43b4bca5a990411ad6fa348c7fad347fd6e79e8ed1ce507b99cd413ce9f7',
        'token_type': 'bearer',
        'expires_in': 7200,
        'refresh_token': '0c6259361b91bed4571e11cb48762ef3cb4d3e290841f4b2621da9556f58d33c',
        'scope': 'public',
        'created_at': 1509813871,
        'expires_at': '2017-11-04T18:44:31.964Z'
      }
    }
  */

  oauth: (req, res) => {
    const response = {
      success: false,
      errors: []
    }
    const db = req.app.db

    const code = req.body.code
    const tokenConfig = {
      code: code,
      redirect_uri: 'http://localhost:3000/oauth/signin'
    }

    oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
      if (error) {
        response.errors.push({ message: error.message })
        return (res.status(202).send(response))
      }

      const data = oauth2.accessToken.create(result)
      const requestOptions = {
        url: 'https://api.intra.42.fr/v2/me',
        headers: {
          'Authorization': 'Bearer ' + data.token.access_token
        }
      }

      request.get(requestOptions, (error, reqResponse, body) => {
        if (!error && reqResponse.statusCode === 200) {
          const userProfile = JSON.parse(body)

          const sourceModel = new UserModel(req.app)
          const unsafeIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress

          console.log('User received from 42 API : ', userProfile)

          var username = userProfile.login.toLowerCase()
          var email = userProfile.email.toLowerCase()
          const firstName = xssEscape(userProfile.first_name.toLowerCase())
          const lastName = xssEscape(userProfile.last_name.toLowerCase())
          const password = 'unsecured_easter_egg'

          db.collection('user')
            .findOne({
              $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
              ]
            })
            .then((result) => {
              if (result && result.email !== email)
                username = username + '1'
              if (result && result.username !== username)
                email = username = '@no-email.given'
              if (result && result.username === username && result.email === email) {
                console.log('User founded, token returned', result)

                jwt.sign({
                  _id: result._id,
                  isSigned: true
                }, req.app.get('tokenSecret'), {
                  expiresIn: (60 * 60 * 24) // 24 hours
                }, function (err, token) {
                  if (err) throw (err)
                  response.token = token
                  if (!result.position.is_set)
                  {
                    GeolocationService.locateByIp(unsafeIp)
                      .then((position) => {
                        sourceModel.hydrateWithDBData(result)
                          .updateOnlineStatus(true)
                          .updatePosition(position)
                          .updateLocation()
                          .update()
                          .then((result) => {
                            console.log('User located by ip')
                            response.success = true
                            return (res.status(200).send(response))
                          })
                          .catch((e) => {
                            console.error(e.name + ': ' + e.message)
                            return (res.status(202).send(response))
                          })
                      })
                      .catch((e) => {
                        console.error('Cannot locate by ip')
                        return (res.status(202).send(response))
                      })
                  }
                  else {
                    console.log('User located by address')
                    response.success = true
                    return (res.status(200).send(response))
                  }
                })
              }
              else {
                console.log('User not created yet, process engaged')

                const photos = sourceModel.getData('photos')
                const photo = {
                  index: 0,
                  externalCDN: true,
                  name: userProfile.login + '.jpg',
                  path: userProfile.image_url
                }
                photos.push(photo)

                sourceModel.hydrateCreationData({
                  username: username,
                  email: email,
                  first_name: firstName,
                  last_name: lastName,
                  password: password
                })
                  .activate()
                  .create()
                  .then((result) => {
                    jwt.sign({
                      _id: result.getData('_id'),
                      isSigned: true
                    }, req.app.get('tokenSecret'), {
                      expiresIn: (60 * 60 * 24) // 24 hours
                    }, function (err, token) {
                      if (err) throw (err)
                      response.token = token

                      GeolocationService.locateByIp(unsafeIp)
                        .then((position) => {
                          sourceModel.hydrateWithDBData(result)
                            .updateOnlineStatus(true)
                            .updatePosition(position)
                            .updateLocation()
                            .update()
                            .then((result) => {
                              console.log('User located by ip')
                              response.success = true
                              return (res.status(200).send(response))
                            })
                            .catch((e) => {
                              console.error(e.name + ': ' + e.message)
                              return (res.status(202).send(response))
                            })
                        })
                        .catch((e) => {
                          console.error('Cannot locate by ip')
                          return (res.status(202).send(response))
                        })
                    })
                  })
                  .catch((e) => {
                    console.error(e.name + ': ' + e.message)
                    response.errors.push({ field: undefined, message: e.message })
                    return (res.status(202).send(response))
                  })
              }
            })
            .catch((e) => {
              console.error(e.name + ': ' + e.message)
              response.errors.push({ field: undefined, message: e.message })
              return (res.status(202).send(response))
            })
        }
        else {
          console.log(error)
          response.errors.push({ message: error })
          res.status(202).send(response)
        }
      })
    })
  },

  activate: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const db = req.app.db
    const account = req.body.account
    const token = req.body.token

    if (!account || ValidationService.isHexa(account) === false)
      response.errors.push({ field: undefined, message: 'invalid account' })
    else if (account.length !== 24)
      response.errors.push({ field: undefined, message: 'invalid account' })
    if (response.errors.length)
      return (res.status(202).send(response))

    db.collection('user')
      .findOne({ _id: new ObjectId(account) })
      .then((user) => {
        if (user)
        {
          if (user.is_active === true)
            throw (new Error('account already activated'))
          if (user.token !== token)
            throw (new Error('invalid token submitted'))
          else
          {
            let userModel = new UserModel(req.app)

            userModel.hydrateWithDBData(user)
              .activate()
              .update()
              .then((result) => {
                if (result)
                {
                  response.success = true
                  response.message = 'account activated'
                  return (res.status(200).send(response))
                }
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push({ field: undefined, message: e.message })
                return (res.status(202).send(response))
              })
          }
        }
        else
          throw (new Error('user not found'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  password: {

    forgot: (req, res) => {
      var response = {
        success: false,
        errors: []
      }
      const db = req.app.db
      const email = (req.body.email) ? req.body.email.toLowerCase() : undefined

      if (!email || ValidationService.isEmail(email) === false)
        response.errors.push({ field: undefined, message: 'invalid email format' })
      if (response.errors.length)
        return (res.status(202).send(response))

      db.collection('user')
        .findOne({ email: email })
        .then((result) => {
          if (result && result.is_active)
          {
            db.collection('user')
              .findAndModify({ _id: result._id }, [], { $set: { token: HashService.generateToken() } }, { new: true })
              .then((result) => {
                if (result)
                {
                  MailService.forgotPassword(result.value)
                  response.success = true
                  return (res.status(200).send(response))
                }
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push({ field: undefined, message: e.message })
                return (res.status(202).send(response))
              })
          }
          else if (!result)
            throw (new Error('user not found'))
          else
            throw (new Error('inactive account'))
        })
        .catch((e) => {
          console.error(e.name + ':' + e.message)
          response.errors.push({ field: undefined, message: e.message })
          return (res.status(202).send(response))
        })
    },

    request: {

      get: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const db = req.app.db
        const account = req.query.account

        if (!account || ValidationService.isHexa(account) === false)
          response.errors.push({ field: undefined, message: 'invalid account' })
        else if (account && account.length !== 24)
          response.errors.push({ field: undefined, message: 'invalid account' })
        if (response.errors.length)
          return (res.status(202).send(response))

        db.collection('user')
          .findOne({ _id: new ObjectId(account) })
          .then((result) => {
            if (result)
            {
              if (result.is_active !== true)
                throw (new Error('inactive account'))
              if (result.token !== req.query.token)
                throw (new Error('invalid token submitted'))
              else
              {
                db.collection('user')
                  .update({ _id: new ObjectId(result._id) }, { $set: { is_active: true } })
                  .then((result) => {
                    if (result)
                    {
                      response.success = true
                      response.token = req.query.token
                      response.account = req.query.account
                      return (res.status(200).send(response))
                    }
                  })
                  .catch((e) => {
                    console.error(e.name + ': ' + e.message)
                    response.errors.push({ field: undefined, message: e.message })
                    return (res.status(202).send(response))
                  })
              }
            }
            else
              throw (new Error('user not found'))
          })
          .catch((e) => {
            console.error(e.name + ': ' + e.message)
            response.errors.push({ field: undefined, message: e.message })
            return (res.status(202).send(response))
          })
      },

      post: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const db = req.app.db
        const account = req.body.account
        const token = req.body.token
        const password = req.body.password
        const passwordConfirmation = req.body.password_confirmation
        const passwordStrength = (password !== undefined) ? owasp.test(password) : {strong: false}

        if (!account || ValidationService.isHexa(account) === false)
          response.errors.push({ field: undefined, message: 'invalid account' })
        else if (account.length !== 24)
          response.errors.push({ field: undefined, message: 'invalid account' })
        if (password !== passwordConfirmation)
          response.errors.push({ field: 'passwordConfirmation', message: 'invalid password confirmation' })
        if (passwordStrength.strong === false)
          response.errors.push({ field: 'password', message: 'password is not strong enough' })
        if (response.errors.length)
          return (res.status(202).send(response))

        db.collection('user')
          .findOne({ _id: new ObjectId(account) })
          .then((result) => {
            if (result)
            {
              if (account !== result._id.toString())
                throw (new Error('invalid account'))
              else if (token !== result.token)
                throw (new Error('invalid token'))
              else
              {
                let userModel = new UserModel(req.app)

                userModel.hydrateWithDBData(result)
                  .updatePassword(password)
                  .update()
                  .then((result) => {
                    if (result)
                    {
                      response.success = true
                      return (res.status(200).send(response))
                    }
                  })
                  .catch((e) => {
                    console.error(e.name + ': ' + e.message)
                    response.errors.push({ field: undefined, message: e.message })
                    return (res.status(202).send(response))
                  })
              }
            }
            else
              throw (new Error('user not found'))
          })
          .catch((e) => {
            console.error(e.name + ': ' + e.message)
            response.errors.push({ field: undefined, message: e.message })
            return (res.status(202).send(response))
          })
      }
    }
  },

  checkToken: (req, res) => {
    var response = {
      success: false
    }

    response.success = true
    return (res.status(200).send(response))
  }
}
