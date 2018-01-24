'use strict'

module.exports = {

  subject: 'Welcome to our numeric love island sweet heart !',
  link: function (_id, token) {
    const urlProtocol = 'http'
    const urlHost = 'localhost'
    const urlPort = '3000'
    const urlRoute = '/activate/'
    const urlQuery = _id + '&' + token
    const url = urlProtocol + '://' + urlHost + ':' + urlPort + urlRoute + urlQuery

    const linkText = 'Click here to activate your account.'
    const link = '<a target="_blank" href="' + url + '">' + linkText + '</a>'

    const body = '<body>' + link + '</body>'
    const header = '<header></header>'
    const html = '<!DOCTYPE html>' + '<html>' + header + body + '</html>'

    return (html)
  }
}
