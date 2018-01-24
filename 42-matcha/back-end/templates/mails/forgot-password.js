"use strict";

module.exports = {

  subject: 'Oosh ! Have you forgotten your password ?',
  link: function (_id, token) {

    const urlProtocol = 'http'
    const urlHost = 'localhost'
    const urlPort = '3000'
    const urlRoute = '/change-password/'
    const urlQuery = _id + '&' + token
    const url = urlProtocol + '://' + urlHost + ':' + urlPort + urlRoute + urlQuery

    const linkText = 'Click here to change your account password.'
    const link = '<a target="_blank" href="' + url + '">' + linkText + '</a>'

    const body = '<body>' + link + '</body>'
    const header = '<header></header>'
    const html = '<!DOCTYPE html>' + '<html>' + header + body + '</html>'

    return (html)
  }
};
