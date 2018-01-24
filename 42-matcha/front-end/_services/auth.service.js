'use strict'

export const authService = {
  activateAccount,
  changePassword,
  forgotPassword,
  login,
  logout,
  oauthLogin,
  register
}

function activateAccount (informations) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(informations)
  }
  return (
    fetch('http://localhost:4242/api/auth/activate', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function changePassword (informations) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(informations)
  }
  return (
    fetch('http://localhost:4242/api/auth/request-password', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function forgotPassword (informations) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(informations)
  }
  return (
    fetch('http://localhost:4242/api/auth/forgot-password', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function register (informations) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(informations)
  }
  return (
    fetch('http://localhost:4242/api/auth/signup', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function login (informations) {
  const { username, password } = informations
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }
  return (
    fetch('http://localhost:4242/api/auth/signin', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          localStorage.setItem('token', JSON.stringify(result.token))
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function oauthLogin (informations) {
  const { code } = informations
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  }
  return (
    fetch('http://localhost:4242/api/oauth/signin', requestOptions)
      .then(response => {
        if (!response.ok) {
          return (Promise.reject(response.statusText))
        }
        return (response.json())
      })
      .then(result => {
        if (result && result.success) {
          localStorage.setItem('token', JSON.stringify(result.token))
          return (result)
        } else {
          return (Promise.reject(result.errors))
        }
      })
  )
}

function logout (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/auth/signout'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    }),
    body: JSON.stringify(informations)
  }

  return (
    fetch(url, requestOptions)
      .then((result) => {
        localStorage.clear()
      })
  )
}
