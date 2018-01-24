'use strict'

module.exports = {

  init: (req, res) => {
    // console.log(req.app.db);
    console.log('Example Controller initialized')
    res.send("It's alive ! ALIVE !")
  }
}
