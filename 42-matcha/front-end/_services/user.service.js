'use strict'

export const userService = {
  logout,

  getBaseInfos,

  listAllUsers,
  listInfos,
  listInfosFrom,
  listMessages,
  listMessagesFrom,

  blockInteraction,
  likeInteraction,
  talkInteraction,
  reportInteraction,
  unblockInteraction,
  unlikeInteraction,
  viewInteraction,

  refreshGuests,
  refreshNotifications,
  refreshMessagesFrom,

  suggestUsers,

  updateCoords,
  updateEmail,
  updateInterests,
  updateMessagesFrom,
  updateNotifications,
  updatePassword,
  updatePhotos,
  updateProfile,
  updateProfilePhoto
}

function logout (informations) {
  return (
    Promise.resolve({})
  )
}

function updateProfilePhoto (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/profile/photo'
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

function updateProfile (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/profile'
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

function updateInterests (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/interests'
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

function updatePhotos (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/photos'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const data = new FormData()

  data.append('photos', informations.photos)

  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'X-Access-Token': token
    }),
    body: data
  }
  return (
    fetch(url, requestOptions)
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
      .catch((e) => {
        console.error(e)
        return (Promise.reject(e))
      })
  )
}

function updateEmail (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/account/email'
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

function updateCoords (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/location/coords'
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

function updateNotifications (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/notifications'
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

function refreshGuests (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/refresh/guests'
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

function refreshNotifications (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/refresh/notifications'
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

function updateMessagesFrom (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/messages'
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

function refreshMessagesFrom (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/refresh/messages'
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

function updatePassword (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/update/account/password'
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

function listMessages (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/list/messages'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function listMessagesFrom (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/list/messages/' + informations.username
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function getBaseInfos (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/infos/base'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function listInfos (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/infos'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function listInfosFrom (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/infos/' + informations.username
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function suggestUsers (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/suggest'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

function listAllUsers (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/list'
  const token = (rawToken) ? JSON.parse(rawToken) : undefined
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Access-Token': token
    })
  })
  return (
    fetch(request)
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

/*
** Interactions
*/


function talkInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/talk'
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

function likeInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/like'
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

function reportInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/report/update'
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

function unlikeInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/unlike'
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

function blockInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/block'
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

function unblockInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/unblock'
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

function viewInteraction (informations) {
  const rawToken = localStorage.getItem('token')
  const url = 'http://localhost:4242/api/user/view'
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
