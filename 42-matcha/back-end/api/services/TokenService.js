'use strict'

const jwt = require('jsonwebtoken')

module.exports = {

  getId: function (req) {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    var njwt = null

    if (token)
    {
      try {
        njwt = jwt.verify(token, req.app.get('tokenSecret'))
      }
      catch (e) {
        console.error(e.name + ': ' + e.message)
      }
    }
    if (njwt && njwt._id)
      return (njwt._id)
    return (undefined)
  }
}
