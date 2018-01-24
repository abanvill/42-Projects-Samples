'use strict'

const mailer = require('nodemailer')
const password = require('../../config/secret.js').mail
const SignupTemplate = require('../../templates/mails/signup.js')
const ForgotPasswordTemplate = require('../../templates/mails/forgot-password.js')

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'RandomGmailAddress@gmail.com',
    pass: password
  }
})

module.exports = {

  signup: function (data) {
    const options = {
      from: 'matcha@42.fr',
      to: data.email,
      subject: SignupTemplate.subject,
      html: SignupTemplate.link(data._id, data.token)
    }

    transporter.sendMail(options, function (err, result) {
      console.error(err)
      console.log('Email sended', result)
    })
  },

  forgotPassword: function (data) {
    console.log('forgotPassword data: ', data)

    const options = {
      from: 'matcha@42.fr',
      to: data.email,
      subject: ForgotPasswordTemplate.subject,
      html: ForgotPasswordTemplate.link(data._id, data.token)
    }

    transporter.sendMail(options, function (err, result) {
      console.error(err)
      console.log('Email sended', result)
    })
  }
}
