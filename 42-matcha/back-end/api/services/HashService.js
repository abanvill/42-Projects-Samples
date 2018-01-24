'use strict'

const crypto = require('crypto')

module.exports = {

  generateToken: function () {
    let hash = crypto.createHash('sha256')

    hash.update(crypto.randomBytes(64))
    return (hash.digest('hex'))
  },

  generateSalt: function (secret) {
    let now = new Date()
    let hash = crypto.createHash('sha256')
    let digest = null

    hash.update(secret)
    hash.update(now.toJSON())

    digest = hash.digest('hex')
    return (digest)
  },

  encrypt: function (secret, salt, password) {
    let hash = crypto.createHash('sha256')
    let digest = null

    hash.update(secret)
    hash.update(salt)
    hash.update(password)

    digest = hash.digest('hex')
    return (digest)
  }
}
