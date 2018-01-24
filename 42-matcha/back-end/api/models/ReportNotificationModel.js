'use strict'

class ReportNotificationModel
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
      type: {
        private: false,
        data: ''
      },
      source: {
        private: false,
        data: ''
      },
      target: {
        private: false,
        data: ''
      },
      comment: {
        private: false,
        data: ''
      },
      at: {
        private: false,
        data: Date.now()
      }
    }
  }

  /*
  ** CRUD methods
  */

  update ()
  {
    var promise = new Promise((resolve, reject) => {
      this.db.collection('report')
        .update({
          source: this.getData('source'),
          target: this.getData('target'),
          type: this.getData('type')
        }, this.getPublicModelData(), { upsert: true })
        .then((result) => {
          if (result) resolve(result)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
    return (promise)
  }

  /*
  ** Public methods
  */

  hydrate (type, sourceUsername, targetUsername, comment)
  {
    this.setData('type', type)
    this.setData('source', sourceUsername)
    this.setData('target', targetUsername)
    this.setData('comment', comment)

    return (this)
  }

  /*
  ** setters
  */

  setData (key, value)
  {
    if (this.model[key])
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

  getModelData ()
  {
    var model = {}
    const data = this.model

    for (let key in data)
      model[key] = data[key].data

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
}

module.exports = ReportNotificationModel
