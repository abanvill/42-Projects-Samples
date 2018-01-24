'use strict'

const { MongoClient } = require('mongodb')
const config = require('./app.js')

module.exports = {

  config: {
    dbname: 'matcha',
    url: 'mongodb://' + config.origins.database + '/'
  },
  db: null,

  connect: function () {
    var that = this
    var promise = new Promise((resolve, reject) => {
      MongoClient.connect(this.config.url + this.config.dbname)
        .then((db) => {
          console.log("Connection to database 'matcha' successfull")
          that.db = db
          resolve(db)
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
          reject(e)
        })
    })
    return (promise)
  },

  getDatabase: function () {
    if (!this.db)
      console.error('Not connected to database.')
    return (this.db)
  }
}
