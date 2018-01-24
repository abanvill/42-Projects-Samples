'use strict'

const iplocation = require('iplocation')
const NodeGeocoder = require('node-geocoder')
const apiKey = require('../../config/secret.js').api.maps
const ValidationService = require('./ValidationService.js')

const geocoder = NodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  apiKey: apiKey,
  formatter: null
})

module.exports = {

  locateByIp: (ip) => {
    var promise = new Promise((resolve, reject) => {
      var location = {
        lat: 48.896607,
        lon: 2.318501
      }

      if (!ip)
        return (reject(new Error(`not a valid ip: [${ip}]`)))
      else if (ValidationService.isIP(ip) === false)
        return (reject(new Error(`not a valid ip: [${ip}]`)))

      iplocation(ip)
        .then((locationResult) => {
          if ((ip !== '::1') && (ip !== '::ffff:127.0.0.1')) {
            location.lat = locationResult.latitude
            location.lon = locationResult.longitude
          }
          geocoder.reverse(location, function (err, res) {
            if (err) {
              return (reject(err))
            }
            return (resolve(res))
          })
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
          return (reject(e))
        })
    })
    return (promise)
  },

  locateByCoords: (coords) => {
    var promise = new Promise((resolve, reject) => {
      var location = {
        lat: coords.lat,
        lon: coords.lon
      }

      if (!location.lat || !location.lon)
        return (reject(new Error(`invalid coords [${location.lat},${location.lon}]`)))
      else if (ValidationService.isLatLon(`${location.lat},${location.lon}`) === false)
        return (reject(new Error(`invalid coords [${location.lat},${location.lon}]`)))

      geocoder.reverse(location, function (err, res) {
        if (err) {
          return (reject(err))
        }
        return (resolve(res))
      })
    })
    return (promise)
  },

  locateByAddress: (address) => {
    var promise = new Promise((resolve, reject) => {
      if (!address)
        return (reject(new Error('empty address')))

      geocoder.geocode(address, function (err, res) {
        if (err) {
          return (reject(err))
        }
        return (resolve(res))
      })
    })
    return (promise)
  }
}
