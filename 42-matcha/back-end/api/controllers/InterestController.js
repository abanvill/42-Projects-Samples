'use strict'

module.exports = {

  list: (req, res) => {
    const db = req.app.db
    var response = {
      success: false,
      content: [],
      errors: []
    }

    db.collection('interest')
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
          response.errors.push('no interest founded')
          return (res.status(202).send(response))
        }
      })
      .catch((e) => {
        console.error(e.name + ': ' + e.message)
        response.errors.push(e.message)
        return (res.status(202).send(response))
      })
  }
}
