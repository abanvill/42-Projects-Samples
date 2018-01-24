'use strict'

const humanparser = require('humanparser')
const mkdirp = require('mkdirp')

const fs = require('fs')
const path = require('path')
const HashService = require('../services/HashService.js')
const ELOService = require('../services/ELOService.js')

class UserModel
{
  constructor (app)
  {
    this.app = app
    this.db = (app) ? app.db : undefined
    this.model = {
      _id: {
        private: true,
        data: undefined
      },
      username: {
        private: false,
        required: true,
        regexp: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
        data: undefined
      },
      email: {
        private: true,
        required: true,
        regexp: /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        data: undefined
      },
      password: {
        private: true,
        hidden: true,
        required: true,
        regexp: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/,
        data: undefined
      },
      salt: {
        private: true,
        hidden: true,
        data: undefined
      },
      token: {
        private: true,
        hidden: true,
        data: undefined
      },
      subscribed_at: {
        private: true,
        data: undefined
      },
      last_connection_at: {
        private: false,
        data: undefined
      },
      first_name: {
        private: false,
        required: true,
        regexp: /^[A-Z][-a-zA-Z]{4,64}$/,
        data: undefined
      },
      last_name: {
        private: false,
        required: true,
        regexp: /^[A-Z][-a-zA-Z]{4,64}$/,
        data: undefined
      },
      age: {
        private: false,
        required: true,
        data: '18'
      },
      gender: {
        private: false,
        required: true,
        data: undefined
      },
      orientation: {
        private: false,
        required: false,
        data: '2'
      },
      bio: {
        private: false,
        required: false,
        regexp: undefined,
        data: null
      },
      score: {
        private: false,
        data: 1500
      },
      interests: {
        private: false,
        data: []
      },
      notifications: {
        private: true,
        data: []
      },
      photos: {
        private: false,
        data: []
      },
      position: {
        private: false,
        data: {
          address: undefined,
          street: undefined,
          street_number: undefined,
          street_address: undefined,
          city: undefined,
          region: undefined,
          region_code: undefined,
          zip: undefined,
          country: undefined,
          country_code: undefined,
          lat: undefined,
          lon: undefined,
          is_set: false
        }
      },
      location: {
        private: true,
        data: {
          index: '2dsphere',
          type: 'Point',
          coordinates: [0, 0]
        }
      },
      threads: {
        private: true,
        data: {}
      },
      liked_to: {
        private: true,
        data: []
      },
      liked_by: {
        private: true,
        hidden: true,
        data: []
      },
      blocked_to: {
        private: true,
        data: []
      },
      blocked_by: {
        private: true,
        data: []
      },
      matches: {
        private: true,
        data: []
      },
      viewed_by: {
        private: true,
        data: []
      },
      is_active: {
        private: true,
        hidden: true,
        data: false
      },
      is_admin: {
        private: true,
        hidden: true,
        data: false
      },
      is_online: {
        private: false,
        hidden: true,
        data: false
      },
      informations: {
        private: true,
        data: {
          messages: 0,
          notifications: 0,
          views: 0
        }
      }
    }
  }

  /*
  ** CRUD methods
  */

  create ()
  {
    var promise = new Promise((resolve, reject) => {
      this.db.collection('user')
        .insertOne(this.getModelData())
        .then((result) => {
          if (result)
          {
            this.setData('_id', result.insertedId)
            return (resolve(this))
          }
          else
            throw (new Error('account creation failure'))
        })
        .catch((e) => {
          console.error(e)
          return (reject(e))
        })
    })
    return (promise)
  }

  update ()
  {
    var promise = new Promise((resolve, reject) => {
      const informations = this.getData('informations')

      informations.messages = this.getUnreadMessages().length
      informations.notifications = this.getUnreadNotifications().length

      this.db.collection('user')
        .update({ _id: this.getData('_id') }, this.getModelData())
        .then((result) => {
          return (resolve(result))
        })
        .catch((e) => {
          console.error(e)
          return (reject(e))
        })
    })
    return (promise)
  }

  /*
  **  public methods
  */

  activate ()
  {
    this.setData('is_active', true)
    this.setData('token', null)
    return (this)
  }

  block (targetUsername)
  {
    this.getData('blocked_users').push(targetUsername)
    return (this)
  }

  unblock (targetUsername)
  {
    const blockedUsers = this.getData('blocked_users')
    const blockedIndex = blockedUsers.indexOf(targetUsername)

    blockedUsers.splice(blockedIndex, 1)
    return (this)
  }

  viewBy (sourceUsername)
  {
    const viewedBy = this.getData('viewed_by')
    const informations = this.getData('informations')
    const index = viewedBy.findIndex(i => i.username === sourceUsername)

    var guest = {
      username: sourceUsername,
      at: Date.now()
    }

    if (index === -1)
      viewedBy.push(guest)
    else
      viewedBy[index].at = guest.at

    viewedBy.sort(function (a, b) {
      return (new Date(b.at) - new Date(a.at))
    })

    while (viewedBy.length > 64)
      viewedBy.pop()

    informations.views = viewedBy.length

    return (this)
  }

  likeTo (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const likedTo = this.getData('liked_to')
    const targetScore = targetModel.getData('score')
    const sourceScore = this.getData('score')

    likedTo.push(targetUsername)
    this.setData('score', ELOService.calculate(sourceScore, targetScore, 0).source)
    return (this)
  }

  likeBy (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const likedBy = this.getData('liked_by')
    const targetScore = targetModel.getData('score')
    const sourceScore = this.getData('score')

    likedBy.push(targetUsername)
    this.setData('score', ELOService.calculate(sourceScore, targetScore, 1).source)
    this.notificate('like', targetUsername)

    return (this)
  }

  blockTo (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const blockedTo = this.getData('blocked_to')

    blockedTo.push(targetUsername)
    return (this)
  }

  blockBy (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const blockedBy = this.getData('blocked_by')

    blockedBy.push(targetUsername)
    return (this)
  }

  unblockTo (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const blockedTo = this.getData('blocked_to')

    var index = blockedTo.indexOf(targetUsername)

    if (index !== -1)
      blockedTo.splice(index, 1)

    return (this)
  }

  unblockBy (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const blockedBy = this.getData('blocked_by')

    var index = blockedBy.indexOf(targetUsername)

    if (index !== -1)
      blockedBy.splice(index, 1)

    return (this)
  }

  matcha (targetUsername)
  {
    const matches = this.getData('matches')
    const threads = this.getData('threads')

    matches.push({
      match_at: Date.now(),
      username: targetUsername
    })
    threads[targetUsername] = [{ match_at: Date.now(), content: 'Hey i\'ve matched with you. Say hello !' }]
    this.notificate('match', targetUsername)

    return (this)
  }

  unlikeTo (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const likedTo = this.getData('liked_to')
    const targetScore = targetModel.getData('score')
    const sourceScore = this.getData('score')

    var index = likedTo.indexOf(targetUsername)

    if (index !== -1)
    {
      likedTo.splice(index, 1)
      this.setData('score', ELOService.calculate(sourceScore, targetScore, 1).source)
    }
    return (this)
  }

  unlikeBy (targetModel)
  {
    const targetUsername = targetModel.getData('username')
    const likedBy = this.getData('liked_by')
    const targetScore = targetModel.getData('score')
    const sourceScore = this.getData('score')

    var index = likedBy.indexOf(targetUsername)

    if (index !== -1)
    {
      likedBy.splice(index, 1)
      this.setData('score', ELOService.calculate(sourceScore, targetScore, 0).source)
      this.notificate('unlike', targetUsername)
    }
    return (this)
  }

  unmatcha (targetUsername)
  {
    const matches = this.getData('matches')
    const threads = this.getData('threads')

    var index = matches.findIndex(i => i.username === targetUsername)

    if (index !== -1)
      matches.splice(index, 1)
    if (threads[targetUsername])
      threads[targetUsername] = undefined
    return (this)
  }

  notificate (type, targetUsername)
  {
    const informations = this.getData('informations')
    const notifications = this.getData('notifications')
    const notification = {
      type: type,
      source: targetUsername,
      at: Date.now(),
      read_at: null,
      is_read: false
    }

    notifications.push(notification)
    informations.notifications = this.getUnreadNotifications().length
    return (this)
  }

  talk (targetModel, content)
  {
    const threads = this.getData('threads')
    const sourceUsername = this.getData('username')
    const targetUsername = targetModel.getData('username')

    const sourceMessage = {
      author: sourceUsername,
      content: content,
      submitted_at: Date.now(),
      read_at: Date.now(),
      is_read: true
    }
    const targetMessage = {
      author: sourceUsername,
      content: content,
      submitted_at: Date.now(),
      read_at: null,
      is_read: false
    }

    if (this.getData('threads')[targetUsername] === undefined)
      this.getData('threads')[targetUsername] = []
    if (targetModel.getData('threads')[sourceUsername] === undefined)
      targetModel.getData('threads')[sourceUsername] = []

    threads[targetUsername].push(sourceMessage)
    targetModel.getData('threads')[sourceUsername].push(targetMessage)
    return (this)
  }

  isMatchable (target) {
    var targetOrientation = parseInt(target.orientation)
    var sourceOrientation = parseInt(this.getData('orientation'))
    const targetGender = parseInt(target.gender)
    const sourceGender = parseInt(this.getData('gender'))

    if ((sourceOrientation === targetOrientation) ||
        (targetOrientation === 2) ||
        (sourceOrientation === 2))
    {
      if (sourceOrientation === 0 || targetOrientation === 0) {
        if (targetGender !== sourceGender)
          return (true)
        else
          return (false)
      }
      else if (sourceOrientation === 1 || targetOrientation === 1) {
        if (targetGender === sourceGender)
          return (true)
        else
          return (false)
      }
      else
        return (true)
    }
  }

  updateInterests (data)
  {
    this.setData('interests', data)
    return (this)
  }

  updateOnlineStatus (data)
  {
    this.setData('is_online', data)
    return (this)
  }

  updateLastConnectionDate ()
  {
    this.setData('last_connection_at', Date.now())
    return (this)
  }

  updatePassword (data)
  {
    this.setData('password', HashService.encrypt(this.app.get('saltSecret'), this.getData('salt'), data))
    this.setData('token', null)
    return (this)
  }

  updateProfilePhoto (data)
  {
    const photos = this.getData('photos')

    if (photos.length > 1)
    {
      let profileIndex = photos.findIndex(i => i.index === 0)
      let oldIndex = photos.findIndex(i => i.index === data)

      photos[profileIndex].index = photos[oldIndex].index
      photos[oldIndex].index = 0
    }

    return (this)
  }

  updatePhotos (data)
  {
    var promise = new Promise((resolve, reject) => {
      const photos = this.getData('photos')
      const photosLength = (photos && photos.length) ? photos.length : 0
      const promises = []
      const userPath = 'cdn/photos/users/' + this.getData('_id') + '/'
      const appPath = path.dirname(require.main.filename)

      console.log('Target path: ', appPath + '/public/' + userPath)
      console.log('UserModel.updatePhotos data: ', data)

      if (!data)
        return (reject(new Error('undefined data')))
      if (photosLength >= 5 || (data && (data.length + photosLength) > 5))
        return (reject(new Error('too many photos')))
      if (!fs.existsSync(appPath + '/public/' + userPath))
        mkdirp.sync(appPath + '/public/' + userPath)

      for (let i = 0; i < data.length; i++)
      {
        let photo = {
          index: i + photosLength,
          externalCDN: false,
          name: data[i].filename,
          path: userPath + data[i].filename
        }
        promises.push(this.movePhoto(data[i].path, 'public/' + photo.path))
        photos.push(photo)
      }

      Promise.all(promises)
        .then((result) => {
          console.log('Generated photos: ', photos)
          this.update()
            .then((result) => {
              if (result)
                return (resolve(result))
            })
            .catch((e) => {
              return (reject(e))
            })
        })
        .catch((e) => {
          return (reject(e))
        })
    })
    return (promise)
  }

  updateNotifications (data)
  {
    const informations = this.getData('informations')
    const notifications = this.getData('notifications')

    for (var i = notifications.length - 1; i >= 0; i--) {
      if (!notifications[i].is_read) {
        notifications[i].read_at = Date.now()
        notifications[i].is_read = true
        informations.notifications--
      } else break
    }
    return (this)
  }

  updateMessagesFrom (data)
  {
    const informations = this.getData('informations')
    const thread = this.getData('threads')[data]
    const updatedMessages = []

    for (var i = thread.length - 1; i >= 0; i--) {
      if (!thread[i].is_read) {
        thread[i].read_at = Date.now()
        thread[i].is_read = true
        updatedMessages.push(thread[i])
      }
    }
    informations.messages = this.getUnreadMessages().length

    const sourceUsername = this.getData('username')
    console.log(`${sourceUsername} - UserModel (updateMessagesFrom) informations.messages [Unread message count]: `, informations.messages)
    console.log(`${sourceUsername} - UserModel (updateMessagesFrom) updatedMessages [Updated messages from unread to read status]: `, updatedMessages)

    return (this)
  }

  updateLocation (data)
  {
    const location = this.getData('location')
    const position = this.getData('position')

    location.coordinates = []
    location.coordinates.push(position.lat)
    location.coordinates.push(position.lon)
    return (this)
  }

  updatePosition (data)
  {
    const position = this.getData('position')

    if (data.length)
    {
      position.address = data[0].formattedAddress
      position.street_address = data[0].streetName
      position.street_number = data[0].streetNumber
      position.city = data[0].city
      position.country = data[0].country
      position.country_code = data[0].countryCode
      position.zip = data[0].zipcode
      position.lat = data[0].latitude
      position.lon = data[0].longitude
    }
    return (this)
  }

  updateAddress (data)
  {
    const position = this.getData('position')

    if (data.fullAddress !== '')
    {
      position.address = data.fullAddress
      position.street_address = data.address
      position.city = data.city
      position.zip = data.zipcode
      position.is_set = true
    }
    else
      position.is_set = false
    return (this)
  }

  updateName (data)
  {
    const {first, last} = data

    if (first && last) {
      this.setData('first_name', first)
      this.setData('last_name', last)
    }
    else if (first && !last)
      this.setData('first_name', first)
    else if (!first && last)
      this.setData('last_name', last)
    else if (data)
    {
      try {
        let parsed = humanparser.parseName(data)
        this.setData('first_name', parsed.firstName)
        this.setData('last_name', parsed.lastName)
      } catch (e) {
        return (this)
      }
    }
    return (this)
  }

  updateEmail (data)
  {
    if (data)
      this.setData('email', data)
    return (this)
  }

  updateAge (data)
  {
    if (data)
      this.setData('age', data)
    return (this)
  }

  updateOrientation (data)
  {
    if (data)
      this.setData('orientation', data)
    return (this)
  }

  updateGender (data)
  {
    if (data)
      this.setData('gender', data)
    return (this)
  }

  updateBio (data)
  {
    if (data)
      this.setData('bio', data)
    return (this)
  }

  /*
  ** private methods
  */

  movePhoto (oldPath, newPath)
  {
    var promise = new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, function (err) {
        if (err)
          return (reject(err))
        return (resolve(true))
      })
    })
    return (promise)
  }

  /*
  ** hydrate methods
  */

  hydrateWithDBData (data)
  {
    for (let key in this.model) {
      if (data[key])
        this.setData(key, data[key])
    }
    return (this)
  }

  hydrateProfileData (data)
  {
    this.setData('age', data.age)
    this.setData('gender', data.gender)
    this.setData('orientation', data.orientation)
    this.setData('first_name', data.first_name)
    this.setData('last_name', data.last_name)
    this.setData('bio', data.bio)

    return (this)
  }

  hydrateCreationData (data)
  {
    const saltSecret = this.app.get('saltSecret')

    this.setData('email', data.email.toLowerCase())
    this.setData('username', data.username.toLowerCase())
    this.setData('first_name', data.first_name.toLowerCase())
    this.setData('last_name', data.last_name.toLowerCase())
    this.setData('token', HashService.generateToken())
    this.setData('salt', HashService.generateSalt(saltSecret))
    this.setData('password', HashService.encrypt(saltSecret, this.getData('salt'), data.password))
    this.setData('subscribed_at', Date.now())
    this.setData('last_connection_at', Date.now())
    this.setData('is_active', false)
    this.setData('is_admin', false)

    return (this)
  }

  /*
  ** setters
  */

  setData (key, value)
  {
    if (this.model[key] && value !== undefined)
    {
      this.model[key].data = value
      return (true)
    }
    return (false)
  }

  /*
  ** getters
  */

  getData (key)
  {
    if (this.model[key])
      return (this.model[key].data)
    return (undefined)
  }

  buildMongoRequest () {
    const or = []

    const orientation = parseInt(this.getData('orientation'))
    const gender = parseInt(this.getData('gender'))

    switch (orientation) {
      case (0):
        or.push({
          gender: `${1 - gender}`,
          orientation: { $in: [`${orientation}`, '2'] }
        })
        break
      case (1):
        or.push({
          gender: `${gender}`,
          orientation: { $in: [`${orientation}`, '2'] }
        })
        break
      case (2):
        or.push({
          gender: `${1 - gender}`,
          orientation: { $in: ['0', '2'] }
        })
        or.push({
          gender: `${gender}`,
          orientation: { $in: ['1', '2'] }
        })
        break
    }
    return (or)
  }

  getSeekedGenders () {
    const orientation = parseInt(this.getData('orientation'))
    const gender = parseInt(this.getData('gender'))

    switch (orientation) {
      case (0):
        return ([(gender === 0) ? '1' : '0'])
      case (1):
        return ([(gender === 1) ? '1' : '0'])
      default:
        return (['0', '1'])
    }
  }

  getUnreadNotifications ()
  {
    const notifications = this.getData('notifications')
    const unreadNotifications = []

    for (var i = notifications.length - 1; i >= 0; i--)
    {
      if (!notifications[i].is_read)
        unreadNotifications.push(notifications[i])
      else break
    }
    return (unreadNotifications)
  }

  getUnreadMessages ()
  {
    const sourceUsername = this.getData('username')
    const threads = this.getData('threads')
    const blockedTo = this.getData('blocked_to')
    const blockedBy = this.getData('blocked_by')
    const unreadMessages = []

    for (var key in threads) {
      var messages = threads[key]

      if (!threads[key]) continue
      else if (blockedBy.indexOf(key) !== -1) continue
      else if (blockedTo.indexOf(key) !== -1) continue

      for (var i = messages.length - 1; i >= 0; i--)
      {
        if (messages[i].author !== sourceUsername && !messages[i].is_read)
          unreadMessages.push(messages[i])
        else if (messages[i].author === sourceUsername) continue
        else break
      }
    }
    return (unreadMessages)
  }

  getUnreadMessagesFrom (data)
  {
    const sourceUsername = this.getData('username')
    const threads = this.getData('threads')
    const messages = threads[data]
    const unreadMessages = []

    if (!messages || !messages.length)
      return (unreadMessages)
    for (var i = messages.length - 1; i >= 0; i--)
    {
      if (messages[i].author !== sourceUsername && !messages[i].is_read)
        unreadMessages.push(messages[i])
      else if (messages[i].author === sourceUsername) continue
    }
    return (unreadMessages)
  }

  getBaseModelData ()
  {
    var model = {}

    model['username'] = this.getData('username')
    model['first_name'] = this.getData('first_name')
    model['last_name'] = this.getData('last_name')
    model['photos'] = this.getData('photos')
    model['is_online'] = this.getData('is_online')

    return (model)
  }

  getPublicModelData ()
  {
    var model = {}
    const data = this.model

    for (let key in data)
      if (data[key].private === false)
        model[key] = data[key].data

    return (model)
  }

  getPrivateModelData ()
  {
    var model = {}
    const data = this.model

    for (let key in data)
      if (data[key].hidden !== true)
        model[key] = data[key].data

    return (model)
  }

  getModelData ()
  {
    var model = {}
    const data = this.model

    for (let key in data)
      model[key] = data[key].data

    return (model)
  }
}

module.exports = UserModel
