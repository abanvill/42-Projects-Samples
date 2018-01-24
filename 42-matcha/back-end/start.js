'use strict'

const path = require('path')
const express = require('express')
const app = express()
const db = require('./config/database.js')
const router = require('./config/routes.js')
const secrets = require('./config/secret.js')
const config = require('./config/app.js')
const bodyParser = require('body-parser')
// const morgan = require('morgan')
const helmet = require('helmet')

const port = process.env.PORT || 4242
const io = require('socket.io').listen(app.listen(port))

app.set('tokenSecret', secrets.token)
app.set('saltSecret', secrets.salt)
app.set('fixtureSecret', secrets.fixture)

app.set('io', io)
app.set('ioClients', {})

app.use(helmet())
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true, limit: config.file.maxLimit }))
app.use(bodyParser.json({ limit: '5mb' }))

app.use(express.static(path.join(__dirname, '/public')))
app.use('/', router)

db.connect()
  .then(() => {
    console.log('Call to MongoDB connect()')
    app.db = db.getDatabase()
  })
  .then(() => {
    io.on('connection', (client) => {
      client.on('whoami', (data) => {
        const ioClients = app.get('ioClients')

        console.log('Socket connection request: ', data)
        ioClients[data] = client
      })
    })
  })
