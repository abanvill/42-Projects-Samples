'use strict'

const express = require('express')
const moment = require('moment')
const multer = require('multer')
const upload = multer({ dest: './cdn/tmp' }).fields([ { name: 'photos', maxCount: 5 } ])
const router = express.Router()
const policies = require('./policies.js')
const controllers = require('./controllers.js')
const config = require('./app.js')

/*
** Global hooks
*/

router.use((req, res, next) => {
  let day = moment(Date.now())
  console.log(req.url + ' requested at: ', day.format('YYYY-MM-DD HH:mm:ss'))
  next()
})

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'POST, GET')
  res.header('Access-Control-Allow-Origin', config.origins.client) // CDN
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token')
  res.header('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return (res.status(200).send())
  }
  else {
    next()
  }
})

/*
** Interest relative
*/

router.get('/api/interests/list',
  controllers.interest.list
)

/*
** Data relative
*/

router.get('/api/user/infos/base',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.infos.base
)
router.get('/api/user/infos',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.infos.list
)
router.get('/api/user/infos/:username',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.data.infos.listFrom
)
router.get('/api/user/list/interests',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.interests.list
)
router.get('/api/user/list/likes',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.likes.list
)
router.get('/api/user/list/matches',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.matches.list
)
router.get('/api/user/list/messages',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.messages.list
)
router.get('/api/user/list/messages/:username',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.messages.listFrom
)
router.get('/api/user/list/photos',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.photos.list
)
router.get('/api/user/suggest',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.suggest
)
router.get('/api/user/list',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.list
)

/*
** User interactions relative
*/

router.post('/api/user/view/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.view
)
router.post('/api/user/block/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.block
)
router.post('/api/user/unblock/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.unblock
)
router.post('/api/user/like/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.like
)
router.post('/api/user/unlike/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.unlike
)
router.post('/api/user/talk/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.action.talk
)

/*
** User notifications relative
*/

router.post('/api/user/update/notifications',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.notifications.update
)
router.post('/api/user/update/messages/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.data.messages.update
)
router.post('/api/user/refresh/guests',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.guests.refresh
)
router.post('/api/user/refresh/notifications',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.notifications.refresh
)
router.post('/api/user/refresh/messages/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.user.data.messages.refresh
)

/*
** User report relative
*/

router.get('/api/report/list',
  policies.auth.isAdmin,
  controllers.request.source,
  controllers.report.list
)
router.post('/api/report/update/:username?',
  policies.auth.isSigned,
  controllers.request.both,
  controllers.report.update
)

/*
** Profile data update relative
*/

router.post('/api/user/update/profile',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.update
)
router.post('/api/user/update/profile/name',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.name.update
)
router.post('/api/user/update/account/age',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.age.update
)
router.post('/api/user/update/profile/gender',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.gender.update
)
router.post('/api/user/update/profile/orientation',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.orientation.update
)
router.post('/api/user/update/profile/bio',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.bio.update
)
router.post('/api/user/update/location',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.location.update
)
router.post('/api/user/update/location/coords',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.location.updateByCoords
)
router.post('/api/user/update/profile/location',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.location.update
)
router.post('/api/user/update/profile/address',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.address.update
)
router.post('/api/user/update/interests',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.interests.update
)
router.post('/api/user/update/profile/photo/:index?',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.photo.update
)
router.post('/api/user/update/photos',
  policies.auth.isSigned,
  (req, res, next) => {
    upload(req, res, function (err) {
      var response = { success: false, errors: [] }
      console.log('req: ', req)
      console.log('req.body: ', req.body)
      console.log('req.files: ', req.files)
      if (err) {
        response.errors.push('invalid field name')
        response.errors.push(err.message)
        return (res.status(202).send(response))
      }
      next()
    })
  },
  controllers.request.source,
  controllers.user.data.photos.update
)

/*
** Profile data validation relative
*/

router.post('/api/user/check/profile/name',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.name.update
)
router.post('/api/user/check/account/age',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.age.check
)
router.post('/api/user/check/profile/gender',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.gender.update
)
router.post('/api/user/check/profile/orientation',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.orientation.update
)
router.post('/api/user/check/profile/bio',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.bio.update
)
router.post('/api/user/check/account/address',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.profile.address.check
)

/*
**  Account data update relative
*/

router.post('/api/user/update/account/email',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.account.email.update
)
router.post('/api/user/update/account/password',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.account.password.update
)

/*
**  Account data validation relative
*/

router.post('/api/user/check/account/email',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.account.email.check
)
router.post('/api/user/check/account/password',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.user.data.account.password.check
)

/*
**  Authentication relative
*/

// router.get('/api/auth/request-password', controllers.auth.password.request.get)

router.post('/api/oauth/signin',
  controllers.auth.oauth
)
router.post('/api/auth/activate',
  controllers.auth.activate
)
router.post('/api/auth/signup',
  controllers.auth.signup
)
router.post('/api/auth/signin',
  controllers.auth.signin
)
router.post('/api/auth/signout',
  policies.auth.isSigned,
  controllers.request.source,
  controllers.auth.signout
)
router.post('/api/auth/forgot-password',
  controllers.auth.password.forgot
)
router.post('/api/auth/request-password',
  controllers.auth.password.request.post
)

/*
**  Development relative
*/

router.get('/api/setup/init/database',
  controllers.database.init
)
router.post('/api/auth/check-token',
  policies.auth.isRegistered,
  controllers.auth.checkToken
)

/*
** Error relative
*/

router.use((req, res, next) => {
  return (res.status(404).send({ success: false, errors: [ { message: 'page not found' } ] }))
})

module.exports = router
