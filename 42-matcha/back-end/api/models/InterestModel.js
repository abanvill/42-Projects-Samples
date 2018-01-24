'use strict'

class InterestModel
{
  constructor (app)
  {
    this.app = app
    this.db = (app) ? app.db : undefined
    this.model = {
      _id: {
        data: undefined
      },
      name: {
        data: undefined
      }
    }
  }

  /*
  ** CRUD methods
  */

  updateMany (data)
  {
    var promise = new Promise((resolve, reject) => {
      if (data === undefined)
        return (reject(new Error('undefined interests data')))

      this.db.collection('interest')
        .find()
        .toArray()
        .then((result) => {
          const interests = []

          if (data === undefined)
            return (reject(new Error('no interests founded')))

          for (let i = 0; i < data.length; i++) {
            let interest = { _id: undefined, name: data[i] }
            if (result.findIndex(i => i.name === interest.name) === -1)
              interests.push(interest)
          }
          if (interests.length)
          {
            this.db.collection('interest')
              .insertMany(interests)
              .then((result) => {
                console.log('Interest insertion result: ', result)
                return (resolve(true))
              })
              .catch((err) => {
                return (reject(err))
              })
          }
          else
            return (resolve('no new documents'))
        })
        .catch((err) => {
          console.error(err)
          return (reject(err))
        })
    })
    return (promise)
  }

  update ()
  {
    var promise = new Promise((resolve, reject) => {
      this.db.collection('interest')
        .update({ _id: this.getData('_id') }, this.getModelData())
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
}

module.exports = InterestModel
