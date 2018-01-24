'use strict'

const xssFilters = require('xss-filters')

module.exports = {

  infos: (req, res) => {
    var response = {
      success: false,
      content: [],
      errors: []
    }
    var sourceModel = req.app.get('result').source

    response.success = true
    response.content = sourceModel.getModelData()
    return (res.status(200).send(response))
  },

  list: (req, res) => {
    var response = {
      success: false,
      content: [],
      errors: []
    }
    const db = req.app.db

    db.collection('user')
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

  block: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')

    if (targetUsername === sourceUsername)
      response.errors.push({ field: 'blocked_to', message: 'you cannot block yourself' })
    else if (sourceModel.getData('blocked_to').indexOf(targetUsername) !== -1)
      response.errors.push({ field: 'blocked_to', message: 'user already blocked' })
    if (response.errors.length)
      return (res.status(202).send(response))

    sourceModel.blockTo(targetModel)
    targetModel.blockBy(sourceModel)

    Promise.all([targetModel.update(), sourceModel.update()])
      .then((result) => {
        if (result)
        {
          response.success = true
          response.content = sourceModel.getPrivateModelData()
          return (res.status(200).send(response))
        }
        else
          throw (new Error('block failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  unblock: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')

    if (targetUsername === sourceUsername)
      response.errors.push({ field: 'blocked_to', message: 'you cannot unblock yourself' })
    else if (sourceModel.getData('blocked_to').indexOf(targetUsername) === -1)
      response.errors.push({ field: 'blocked_to', message: 'user is not blocked' })

    sourceModel.unblockTo(targetModel)
    targetModel.unblockBy(sourceModel)

    Promise.all([targetModel.update(), sourceModel.update()])
      .then((result) => {
        if (result)
        {
          response.success = true
          response.content = sourceModel.getPrivateModelData()
          return (res.status(200).send(response))
        }
        else
          throw (new Error('block failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  like: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')

    if (targetUsername === sourceUsername)
      response.errors.push({ field: 'like', message: 'you cannot like yourself' })
    else if (targetModel.getData('is_active') === false)
      response.errors.push({ field: 'like', message: 'cannot like an inactive user' })
    else if (sourceModel.getData('blocked_to').indexOf(targetUsername) !== -1)
      response.errors.push({ field: 'like', message: 'you cannot like someone you had blocked' })
    else if (targetModel.getData('blocked_to').indexOf(sourceUsername) !== -1)
      response.errors.push({ field: 'like', message: 'you cannot like this user' })
    else if (targetModel.getData('photos').length === 0)
      response.errors.push({ field: 'like', message: 'you cannot like a user who hadnt a photo' })
    else if (sourceModel.getData('liked_to').indexOf(targetUsername) !== -1)
      response.errors.push({ field: 'like', message: 'user already liked' })
    if (response.errors.length)
      return (res.status(202).send(response))

    var hasMatched = false

    if (sourceModel.getData('liked_by').indexOf(targetUsername) !== -1)
    {
      sourceModel.matcha(targetUsername)
      targetModel.matcha(sourceUsername)
      hasMatched = true
    }

    sourceModel.likeTo(targetModel)
    targetModel.likeBy(sourceModel)

    const ioClients = req.app.get('ioClients')

    if (hasMatched) {
      if (ioClients[sourceUsername] !== undefined) {
        ioClients[sourceUsername].emit('newNotification', sourceModel.getUnreadNotifications().length)
        ioClients[sourceUsername].emit('newMatch', targetUsername)
      }
    }
    if (ioClients[targetUsername] !== undefined) {
      ioClients[targetUsername].emit('newNotification', targetModel.getUnreadNotifications().length)
      if (hasMatched)
        ioClients[targetUsername].emit('newMatch', sourceUsername)
    }

    Promise.all([targetModel.update(), sourceModel.update()])
      .then((result) => {
        if (result)
        {
          response.success = true
          response.content = sourceModel.getPrivateModelData()
          return (res.status(200).send(response))
        }
        else
          throw (new Error('like failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  unlike: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')

    if (targetUsername === sourceUsername)
      response.errors.push({ field: 'like', message: 'you cannot unlike yourself' })
    else if (targetModel.getData('is_active') === false)
      response.errors.push({ field: 'like', message: 'cannot unlike an inactive user' })
    else if (sourceModel.getData('blocked_to').indexOf(targetUsername) !== -1)
      response.errors.push({ field: 'like', message: 'you cannot unlike someone you had blocked' })
    else if (targetModel.getData('blocked_to').indexOf(sourceUsername) !== -1)
      response.errors.push({ field: 'like', message: 'you cannot unlike this user' })
    else if (targetModel.getData('photos').length === 0)
      response.errors.push({ field: 'like', message: 'you cannot unlike a user who hadnt a photo' })
    else if (sourceModel.getData('liked_to').indexOf(targetUsername) === -1)
      response.errors.push({ field: 'like', message: 'user is not liked' })
    if (response.errors.length)
      return (res.status(202).send(response))

    if (sourceModel.getData('matches').findIndex(i => i.username === targetUsername) !== -1)
    {
      sourceModel.unmatcha(targetUsername)
      targetModel.unmatcha(sourceUsername)
    }
    sourceModel.unlikeTo(targetModel)
    targetModel.unlikeBy(sourceModel)

    const ioClients = req.app.get('ioClients')

    if (ioClients[targetUsername] !== undefined)
      ioClients[targetUsername].emit('newNotification', targetModel.getUnreadNotifications().length)

    Promise.all([targetModel.update(), sourceModel.update()])
      .then((result) => {
        if (result)
        {
          response.success = true
          response.content = sourceModel.getPrivateModelData()
          return (res.status(200).send(response))
        }
        else
          throw (new Error('like failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  view: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')

    if (targetUsername !== sourceUsername)
      targetModel.viewBy(sourceUsername)
    else
      return (res.status(202).send(response))

    targetModel.update()
      .then((result) => {
        if (result)
        {
          const ioClients = req.app.get('ioClients')

          if (ioClients[targetUsername] !== undefined) {
            ioClients[targetUsername].emit('newGuest', targetModel.getData('informations').views)
          }
          response.success = true
          return (res.status(200).send(response))
        }
        else
          throw (new Error('user profile view failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  },

  talk: (req, res) => {
    var response = {
      success: false,
      errors: []
    }
    const sourceModel = req.app.get('result').source
    const targetModel = req.app.get('result').target

    const sourceUsername = sourceModel.getData('username')
    const targetUsername = targetModel.getData('username')
    const content = xssFilters.inHTMLData(req.body.content)

    console.log(content.length)

    if (targetUsername === sourceUsername)
      response.errors.push({ field: undefined, message: 'you cannot send a message to yourself' })
    else if (sourceModel.getData('blocked_to').indexOf(targetUsername) !== -1)
      response.errors.push({ field: undefined, message: 'you cannot send a message to a blocked user' })
    else if (targetModel.getData('blocked_to').indexOf(sourceUsername) !== -1)
      response.errors.push({ field: undefined, message: 'you cannot send a message to this user' })
    else if (sourceModel.getData('matches').findIndex(i => i.username === targetUsername) === -1)
      response.errors.push({ field: undefined, message: 'you cannot send a message without a match' })
    else if (typeof content === 'string' && content.length > 256)
      response.errors.push({ field: undefined, message: 'the message length must be inferior at 256 chars' })
    if (response.errors.length)
      return (res.status(202).send(response))

    sourceModel.talk(targetModel, content).updateMessagesFrom(targetUsername)

    Promise.all([targetModel.update(), sourceModel.update()])
      .then((result) => {
        if (result)
        {
          console.log(`${targetUsername} - Target() unread message count :`, targetModel.getData('informations').messages)
          console.log(`${sourceUsername} - Source() unread message count :`, sourceModel.getData('informations').messages)

          const ioClients = req.app.get('ioClients')

          if (ioClients[targetUsername] !== undefined) {
            ioClients[targetUsername].emit('newMessageFrom', sourceUsername)
            ioClients[targetUsername].emit('newMessage', targetModel.getData('informations').messages)
          }

          const threads = sourceModel.getData('threads')[targetUsername]
          const content = (threads && threads.length) ? threads[threads.length - 1] : undefined

          response.success = true
          response.target = targetUsername
          response.content = content
          return (res.status(200).send(response))
        }
        else
          throw (new Error('message failure'))
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push({ field: undefined, message: e.message })
        return (res.status(202).send(response))
      })
  }
}
