'use strict'

const _ = require('lodash')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const humanparser = require('humanparser')
const owasp = require('owasp-password-strength-test')
const xssEscape = require('xss-escape')
const xssFilters = require('xss-filters')
const InterestModel = require('../models/InterestModel.js')
const GeolocationService = require('../services/GeolocationService.js')
const ValidationService = require('../services/ValidationService.js')

module.exports = {

  infos: {
    base: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.success = true
      response.content = sourceModel.getBaseModelData()
      return (res.status(200).send(response))
    },

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.success = true
      response.content = sourceModel.getPrivateModelData()
      return (res.status(200).send(response))
    },

    listFrom: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const targetModel = req.app.get('result').target

      response.success = true
      response.content = targetModel.getPublicModelData()
      return (res.status(200).send(response))
    }
  },

  suggest: (req, res) => {
    var response = {
      success: false,
      content: [],
      errors: []
    }
    const db = req.app.db
    const sourceModel = req.app.get('result').source

    /*
    ** Not optimized
    ** A better way is to divide requests into genders and orientations
    */

    console.log('Source: ')
    console.log('[username]: ', sourceModel.getData('username'))
    console.log('[orientation]: ', typeof sourceModel.getData('orientation'))
    console.log('[gender]: ', sourceModel.getData('gender'))
    console.log('---------------------------------------------')

    db.collection('user')
      .find({
        location: {
          $nearSphere: {
            $geometry: sourceModel.getData('location'),
            $minDistance: 0,
            $maxDistance: 80000
          }
        },
        $and: [
          { username: { $ne: sourceModel.getData('username') } },
          { username: { $nin: sourceModel.getData('blocked_to') } },
          { blocked_by: { $ne: sourceModel.getData('username') } },
          { $or: sourceModel.buildMongoRequest() }
        ]
      },
      {
        _id: 0,
        username: 1,
        first_name: 1,
        last_name: 1,
        gender: 1,
        orientation: 1,
        age: 1,
        interests: 1,
        score: 1,
        photos: 1,
        position: 1,
        is_online: 1
      })
      .toArray()
      .then((result) => {
        console.log('Suggested users: ', result)

        if (result.length) {
          const sourceInterests = sourceModel.getData('interests')
          const distanceMultiplier = -10
          const interestMultiplier = 1000

          result.forEach((user, index) => {
            const score = {
              interests: (_.intersection(user.interests, sourceInterests).length * interestMultiplier),
              distance: (index * distanceMultiplier),
              user: user.score
            }
            user.dist = index
            user.gscore = (score.interests) + (score.distance) + (score.user)

            console.log(user.username + ' processed score: ', user.gscore)
          })
          result.sort((a, b) => {
            return (b.gscore - a.gscore)
          })

          response.success = true
          response.content = result
          return (res.status(200).send(response))
        } else {
          response.errors.push({ field: undefined, message: 'no user founded' })
          return (res.status(202).send(response))
        }
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  list: (req, res) => {
    var response = {
      success: false,
      content: [],
      errors: []
    }
    const db = req.app.db
    const sourceModel = req.app.get('result').source

    db.collection('user')
      .find({
        location: {
          $nearSphere: {
            $geometry: sourceModel.getData('location'),
            $minDistance: 0
          }
        },
        $and: [
          { username: { $ne: sourceModel.getData('username') } },
          { username: { $nin: sourceModel.getData('blocked_to') } },
          { blocked_by: { $ne: sourceModel.getData('username') } }
        ]
      },
      {
        _id: 0,
        username: 1,
        first_name: 1,
        last_name: 1,
        gender: 1,
        orientation: 1,
        age: 1,
        interests: 1,
        score: 1,
        photos: 1,
        position: 1,
        is_online: 1
      })
      .toArray()
      .then((result) => {
        if (result.length) {
          const sourceInterests = sourceModel.getData('interests')
          const distanceMultiplier = -10
          const interestMultiplier = 1000

          result.forEach((user, index) => {
            const score = {
              interests: (_.intersection(user.interests, sourceInterests).length * interestMultiplier),
              distance: (index * distanceMultiplier),
              user: user.score
            }
            user.dist = index
            user.gscore = (score.interests) + (score.distance) + (score.user)

            console.log(user.username + ' processed score: ', user.gscore)
          })
          result.sort((a, b) => {
            return (b.gscore - a.gscore)
          })
          response.success = true
          response.content = result
          return (res.status(200).send(response))
        }
        else
        {
          response.errors.push({ field: undefined, message: 'no user founded' })
          return (res.status(202).send(response))
        }
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  guests: {

    refresh: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.success = true
      response.viewedBy = sourceModel.getData('viewed_by')
      response.informations = sourceModel.getData('informations')
      return (res.status(200).send(response))
    }
  },

  likes: {

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source
      const content = {
        liked_to: sourceModel.getData('liked_to'),
        liked_by: sourceModel.getData('liked_by')
      }

      response.content = content
      response.success = true
      return (res.status(200).send(response))
    }
  },

  matches: {

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source
      const content = sourceModel.getData('matches')

      response.content = content
      response.success = true
      return (res.status(200).send(response))
    }
  },

  messages: {

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.content = sourceModel.getData('threads')
      response.success = true
      return (res.status(200).send(response))
    },

    listFrom: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      var sourceModel = req.app.get('result').source
      const username = xssEscape(req.params.username)

      if (!username || ValidationService.isUsername(username) === false)
        response.errors.push({ field: undefined, message: 'invalid username' })
      if (response.errors.length)
        return (res.status(202).send(response))

      response.content = sourceModel.getData('threads')[username]
      response.success = true
      return (res.status(200).send(response))
    },

    update: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const targetModel = req.app.get('result').target

      targetModel
        .update()
        .then((result) => {
          response.success = true
          return (res.status(200).send(response))
        })
        .catch((e) => {
          console.error(e)
          return (res.status(202).send(response))
        })
    },

    refresh: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source
      const targetModel = req.app.get('result').target
      const targetUsername = targetModel.getData('username')

      const thread = sourceModel.getData('threads')[targetUsername]

      targetModel
        .update()
        .then((result) => {
          response.success = true
          response.target = targetUsername
          console.log('Target: ', targetUsername)
          /* Optimized way */
          response.content = thread[thread.length - 1]
          /* Not at all optimized way but working */
          // response.content = sourceModel.getData('threads')[targetUsername]
          return (res.status(200).send(response))
        })
        .catch((e) => {
          console.log('HELLO 2')
          console.error(e)
          return (res.status(202).send(response))
        })
    }
  },

  notifications: {

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.content = sourceModel.getData('notifications')
      response.success = true
      return (res.status(200).send(response))
    },

    update: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source
      const sourceUsername = sourceModel.getData('username')

      sourceModel
        .updateNotifications()
        .update()
        .then((result) => {
          const ioClients = req.app.get('ioClients')

          if (ioClients[sourceUsername] !== undefined)
            ioClients[sourceUsername].emit('newNotification', sourceModel.getUnreadNotifications().length)

          response.success = true
          response.informations = sourceModel.getData('informations')
          response.notifications = sourceModel.getUnreadNotifications()
          return (res.status(200).send(response))
        })
        .catch((e) => {
          return (res.status(202).send(response))
        })
    },

    refresh: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.success = true
      response.notifications = sourceModel.getData('notifications')
      response.informations = sourceModel.getData('informations')
      return (res.status(200).send(response))
    }
  },

  interests: {

    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      const sourceModel = req.app.get('result').source

      response.content = sourceModel.getData('interests')
      response.success = true
      return (res.status(200).send(response))
    },
    update: (req, res) => {
      var response = {
        success: false,
        errors: []
      }
      const sourceModel = req.app.get('result').source
      const interestModel = new InterestModel(req.app)
      const interests = req.body.interests
      const pureInterests = []

      if (Array.isArray(interests) === false)
      {
        response.errors.push({ field: 'interests', message: 'invalid format' })
        return (res.status(202).send(response))
      }
      interests.forEach((elem) => {
        if (typeof elem === 'string' && elem.length < 32)
          pureInterests.push(xssEscape(elem.toLowerCase()))
      })
      if (response.errors.length)
        return (res.status(202).send(response))

      sourceModel.updateInterests(pureInterests)
      Promise.all([sourceModel.update(), interestModel.updateMany(pureInterests)])
        .then((result) => {
          response.success = true
          response.content = sourceModel.getPrivateModelData()
          return (res.status(200).send(response))
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
          response.errors.push({ field: undefined, message: e.message })
          return (res.status(202).send(response))
        })
    }
  },

  account: {

    email: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const sourceModel = req.app.get('result').source
          const db = req.app.db
          var email = xssEscape(req.body.email)

          if (!email)
            return (reject(new Error('no email provided')))

          email = email.toLowerCase()

          if (email !== sourceModel.getData('email') &&
          ValidationService.isEmail(email) === false)
            return (reject(new Error('invalid format')))
          else if (email.length > 128)
            return (reject(new Error('email too long')))

          db.collection('user')
            .findOne({ email: email })
            .then((result) => {
              if (result)
              {
                if (result.email === email)
                  return (reject(new Error('already registered')))
              }
              else
                return (resolve(true))
            })
            .catch((e) => {
              console.error(e.name + ': ' + e.message)
              return (reject(e))
            })
        })
        return (promise)
      },
      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.account.email.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'email', message: e.message })
            return (res.status(202).send(response))
          })
      },
      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const email = xssEscape(req.body.email)

        module.exports.account.email.validate(req, res)
          .then((result) => {
            sourceModel.updateEmail(email.toLowerCase())
              .update()
              .then((result) => {
                if (result)
                {
                  response.success = true
                  response.content = sourceModel.getData('email')
                  return (res.status(200).send(response))
                }
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push({ field: 'email', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'email', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    password: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const password = req.body.password
          const confirmation = req.body.password_confirmation
          const passwordStrength = (password !== undefined) ? owasp.test(password) : {strong: false}

          if (!password)
            return (reject(new Error('no password provided')))
          else
          {
            if (password && password !== confirmation)
              return (reject(new Error('invalid confirmation value')))
            else if (password && passwordStrength.strong === false)
              return (reject(new Error('password is not strong enough')))
          }
          return (resolve(true))
        })
        return (promise)
      },
      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.account.password.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'password', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const password = req.body.password

        module.exports.account.password.validate(req, res)
          .then((result) => {
            sourceModel.updatePassword(password)
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
                response.errors.push({ field: 'password', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'password', message: e.message })
            return (res.status(202).send(response))
          })
      }
    }
  },

  profile: {

    update: (req, res) => {
      var response = {
        success: false,
        errors: []
      }
      const sourceModel = req.app.get('result').source

      const promises = []
      const keys = [
        'address',
        'age',
        'bio',
        'gender',
        'name',
        'orientation'
      ]

      promises.push(module.exports.profile[keys[0]].validate(req, res))
      promises.push(module.exports.profile[keys[1]].validate(req, res))
      promises.push(module.exports.profile[keys[2]].validate(req, res))
      promises.push(module.exports.profile[keys[3]].validate(req, res))
      promises.push(module.exports.profile[keys[4]].validate(req, res))
      promises.push(module.exports.profile[keys[5]].validate(req, res))

      Promise.all(promises.map((promise, i) =>
        promise.catch((e) => {
          e.field = keys[i]
          throw (e)
        })))
        .then((result) => {
          const age = req.body.age
          const fullName = xssEscape(String(req.body.fullName))
          const gender = String(req.body.gender)
          const orientation = String(req.body.orientation)
          const bio = xssEscape(req.body.bio)
          const rawAddress = xssEscape(req.body.address)

          var address = ''

          try {
            address = humanparser.parseAddress(rawAddress)
          } catch (e) {
            response.errors.push({ field: 'address', message: e.message })
            return (res.status(202).send(response))
          }
          sourceModel
            .updateAge(age)
            .updateName(fullName)
            .updateGender(gender)
            .updateOrientation(orientation)
            .updateBio(bio)
            .updateAddress(address)
            .update()
            .then((result) => {
              GeolocationService.locateByAddress(sourceModel.getData('position').address)
                .then((result) => {
                  if (sourceModel.getData('position').is_set === false)
                    throw ('address is not set')
                  sourceModel.updatePosition(result)
                    .updateLocation()
                    .update()
                    .then((result) => {
                      response.success = true
                      response.content = sourceModel.getPrivateModelData()
                      return (res.status(200).send(response))
                    })
                    .catch((e) => {
                      console.error(e.name + ': ' + e.message)
                      return (res.status(202).send(response))
                    })
                })
            })
            .catch((e) => {
              return (res.status(202).send(response))
            })
        })
        .catch((e) => {
          console.log('UserDataController (profile.update) e: ', e.field + ' - ' + e.message)
          if (e.field === 'name')
            e.field = 'fullName'
          response.errors.push({ field: e.field, message: e.message })
          return (res.status(202).send(response))
        })
    },

    name: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const sourceModel = req.app.get('result').source
          const fullName = xssEscape(req.body.fullName)
          const name = {
            first: undefined,
            last: undefined
          }

          if (fullName) {
            let parsed = humanparser.parseName(fullName)
            name.first = parsed.firstName
            name.last = parsed.lastName
          }

          if (!name.first && !name.last)
            return (reject(new Error('no name provided')))
          if (name.first !== sourceModel.getData('first_name') &&
          ValidationService.isName(name.first) === false)
            return (reject(new Error('invalid format')))
          if (name.last !== sourceModel.getData('last_name') &&
          ValidationService.isName(name.last) === false)
            return (reject(new Error('invalid format')))
          if (name.first.length > 32 || name.last.length > 32)
            return (reject(new Error('your name must be human please')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.profile.name.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'full_name', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const fullName = xssEscape(req.body.full_name)
        const name = {
          fist: undefined,
          last: undefined
        }

        module.exports.profile.name.validate(req, res)
          .then((result) => {
            let parsed = humanparser.parseName(fullName)

            name.first = parsed.firstName
            name.last = parsed.lastName
            sourceModel.updateName(name)
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
                response.errors.push({ field: 'full_name', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'full_name', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    age: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const age = req.body.age

          if (!age)
            return (reject(new Error('no age provided')))
          else if (isNaN(age) === true)
            return (reject(new Error('invalid format')))
          else if (parseInt(age) < 18 || parseInt(age) > 99)
            return (reject(new Error('invalid value')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.account.age.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'age', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const age = req.body.age

        module.exports.account.age.validate(req, res)
          .then((result) => {
            sourceModel.updateAge(age)
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
                response.errors.push({ field: 'age', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'age', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    orientation: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const orientation = req.body.orientation

          if (!orientation)
            return (reject(new Error('no orientation provided')))
          else if (isNaN(orientation))
            return (reject(new Error('invalid orientation')))
          else if (parseInt(orientation) < 0 || parseInt(orientation) > 2)
            return (reject(new Error('not a human orientation')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.profile.orientation.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'orientation', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const orientation = req.body.orientation

        module.exports.profile.orientation.validate(req, res)
          .then((result) => {
            sourceModel.updateOrientation(orientation)
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
                response.errors.push({ field: 'orientation', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'orientation', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    gender: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const gender = req.body.gender

          if (!gender)
            return (reject(new Error('no gender provided')))
          else if (isNaN(gender))
            return (reject(new Error('invalid gender')))
          else if (parseInt(gender) < 0 || parseInt(gender) > 2)
            return (reject(new Error('not a human gender')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.profile.gender.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'gender', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const gender = req.body.gender

        module.exports.profile.gender.validate(req, res)
          .then((result) => {
            sourceModel.updateGender(gender)
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
                response.errors.push({ field: 'gender', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'gender', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    bio: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const bio = xssFilters.inHTMLData(req.body.bio)

          if (bio && bio.length > 4096)
            return (reject(new Error('the bio is limited to 4096 chars')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.profile.bio.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'bio', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const bio = req.body.bio

        module.exports.profile.bio.validate(req, res)
          .then((result) => {
            sourceModel.updatebio(bio)
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
                response.errors.push({ field: 'bio', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'bio', message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    photo: {

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const photoNumber = sourceModel.getData('photos').length

        const unsafeData = (req.params.index) ? req.params.index + '' : (req.body.index) ? req.body.index + '' : ''
        const index = xssEscape(unsafeData) + ''

        if (isNaN(index) === true)
          response.errors.push({ field: undefined, message: 'invalid format: ' + index })

        const parsedIndex = parseInt(index)

        if (!parsedIndex)
          response.errors.push({ field: undefined, message: 'invalid index' })
        else if (parsedIndex === 0)
          response.errors.push({ field: undefined, message: 'already the profile photo' })
        else if (parsedIndex < 1 || parsedIndex > photoNumber - 1)
          response.errors.push({ field: undefined, message: 'invalid index' })
        if (response.errors.length)
          return (res.status(202).send(response))

        sourceModel.updateProfilePhoto(parsedIndex)
          .update()
          .then((result) => {
            response.content = sourceModel.getData('photos')
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            console.error(e.name + ': ' + e.message)
            response.errors.push({ field: undefined, message: e.message })
            return (res.status(202).send(response))
          })
      }
    },

    location: {

      updateByCoords: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const coords = {
          lat: req.body.lat,
          lon: req.body.lon
        }

        GeolocationService.locateByCoords(coords)
          .then((result) => {
            sourceModel.updatePosition(result)
              .updateLocation()
              .update()
              .then((result) => {
                console.log('User located by coords')
                response.success = true
                response.content = sourceModel.getPrivateModelData()
                return (res.status(200).send(response))
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                return (res.status(202).send(response))
              })
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const unsafeIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        const coords = {
          lat: req.body.lat,
          lon: req.body.lon
        }

        GeolocationService.locateByAddress(sourceModel.getData('position').address)
          .then((result) => {
            if (sourceModel.getData('position').is_set === false)
              throw ('address is not set')
            sourceModel.updatePosition(result)
              .updateLocation()
              .update()
              .then((result) => {
                console.log('User located by address')
                response.success = true
                return (res.status(200).send(response))
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            console.error('Cannot locate by address: ', sourceModel.getData('address'))
            console.error(e.name + ': ' + e.message)

            GeolocationService.locateByCoords(coords)
              .then((result) => {
                sourceModel.updatePosition(result)
                  .updateLocation()
                  .update()
                  .then((result) => {
                    console.log('User located by coords')
                    response.success = true
                    return (res.status(200).send(response))
                  })
                  .catch((e) => {
                    console.error(e.name + ': ' + e.message)
                    return (res.status(202).send(response))
                  })
              })
              .catch((e) => {
                console.error('Cannot locate by coords:', coords)
                console.error(e.name + ': ' + e.message)
                GeolocationService.locateByIp(unsafeIp)
                  .then((result) => {
                    sourceModel.updatePosition(result)
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
      }
    },

    address: {

      validate: (req, res) => {
        var promise = new Promise((resolve, reject) => {
          const address = xssEscape(req.body.address)

          if (address.length > 256)
            return (reject(new Error('adress too long')))
          return (resolve(true))
        })
        return (promise)
      },

      check: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        module.exports.account.address.validate(req, res)
          .then((result) => {
            response.success = true
            return (res.status(200).send(response))
          })
          .catch((e) => {
            response.errors.push({ field: 'address', message: e.message })
            return (res.status(202).send(response))
          })
      },

      update: (req, res) => {
        var response = {
          success: false,
          errors: []
        }
        const sourceModel = req.app.get('result').source
        const address = xssEscape(req.body.address)

        module.exports.profile.address.validate(req, res)
          .then((result) => {
            sourceModel.updateAddress(humanparser.parseAddress(address))
              .update()
              .then((result) => {
                GeolocationService.locateByAddress(sourceModel.getData('position').address)
                  .then((result) => {
                    if (sourceModel.getData('position').is_set === false)
                      throw ('address is not set')
                    sourceModel.updatePosition(result)
                      .updateLocation()
                      .update()
                      .then((result) => {
                        response.success = true
                        return (res.status(200).send(response))
                      })
                      .catch((e) => {
                        console.error(e.name + ': ' + e.message)
                        return (res.status(202).send(response))
                      })
                  })
              })
              .catch((e) => {
                console.error(e.name + ': ' + e.message)
                response.errors.push({ field: 'address', message: e.message })
                return (res.status(202).send(response))
              })
          })
          .catch((e) => {
            response.errors.push({ field: 'address', message: e.message })
            return (res.status(202).send(response))
          })
      }
    }
  },

  photos: {

    update: (req, res) => {
      var response = {
        success: false,
        errors: []
      }
      const sourceModel = req.app.get('result').source

      console.log('Files: ')
      console.log(req.files)
      console.log(req.body)

      // MUST CHECK THE TYPE OF THE FILES
      // USE THE MIDDLEWARE file-type

      if (req.files === undefined && req.files.photos === undefined)
        response.errors.push({ field: undefined, message: 'no file founded' })
      else {
        const photos = req.files.photos

        if (photos.length) {
          photos.forEach((photo) => {
            console.log('Processed photo: ', photo)
            const buffer = readChunk.sync(photo.path, 0, parseInt(photo.size))
            const type = fileType(buffer)
            if (type.ext !== 'jpg' && type.ext !== 'png')
              response.errors.push({ field: undefined, message: 'invalid file type' })
            console.log(fileType(buffer))
          })
        }
      }

      if (response.errors.length)
        return (res.status(202).send(response))

      sourceModel.updatePhotos(req.files.photos)
        .then((result) => {
          response.success = true
          response.content = sourceModel.getData('photos')
          return (res.status(200).send(response))
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
          response.errors.push({ field: 'photos', message: e.message })
          res.status(202).send(response)
        })
    },
    list: (req, res) => {
      var response = {
        success: false,
        content: [],
        errors: []
      }
      var sourceModel = req.app.get('result').source

      response.content = sourceModel.getData('photos')
      response.success = true
      return (res.status(200).send(response))
    }
  }
}
