'use strict'

function createUserSchema (db) {
  var promise = new Promise((resolve, reject) => {
    db.createCollection('user',
      {
        capped: false,
        autoIndexId: true,
        validator: {
          $and: [
            { username: { $type: 'string', $exists: true } },
            { email: { $type: 'string', $exists: true } },
            { password: { $type: 'string', $exists: true } }
          ]
        },
        validationAction: 'warn',
        validationLevel: 'strict'
      })
      .then((result) => {
        db.collection('user').createIndex({ 'location': '2dsphere' })
        if (result)
          resolve('User collection created')
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
  return (promise)
}

function createInterestSchema (db) {
  var promise = new Promise((resolve, reject) => {
    db.createCollection('interest',
      {
        capped: false,
        autoIndexId: true,
        validator: {
          $and: [
            { name: { $type: 'string', $exists: true } }
          ]
        },
        validationAction: 'warn',
        validationLevel: 'strict'
      })
      .then((result) => {
        if (result)
          resolve('Interest collection created')
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
  return (promise)
}

function createReportSchema (db) {
  var promise = new Promise((resolve, reject) => {
    db.createCollection('report',
      {
        capped: false,
        autoIndexId: true,
        validator: {
          $and: [
            { type: { $type: 'number', $exists: true } },
            { source: { $type: 'string', $exists: true } },
            { target: { $type: 'string', $exists: true } }
          ]
        },
        validationAction: 'warn',
        validationLevel: 'strict'
      })
      .then((result) => {
        if (result)
          resolve('Report collection created')
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
  return (promise)
}

function createDatabase (db) {
  Promise.all([
    createUserSchema(db),
    createInterestSchema(db),
    createReportSchema(db)
  ])
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = {

  init: (req, res) => {
    createDatabase(req.app.db)
    console.log('Database Controller initialized')
    res.send("It's alive ! ALIVE !")
  }
}
