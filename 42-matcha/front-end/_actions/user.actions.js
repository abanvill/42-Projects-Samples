import { userConstants } from '../_constants'
import { userService } from '../_services'

export const userActions = {
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

function logout (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.logout(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LOGOUT_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LOGOUT_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LOGOUT_FAILURE, error }) }
}

function updateProfilePhoto (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateProfilePhoto(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_PROFILE_PHOTO_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_PROFILE_PHOTO_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_PROFILE_PHOTO_FAILURE, error }) }
}

function updateInterests (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateInterests(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_INTERESTS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_INTERESTS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_INTERESTS_FAILURE, error }) }
}

function updateProfile (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateProfile(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_PROFILE_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_PROFILE_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_PROFILE_FAILURE, error }) }
}

function updatePhotos (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updatePhotos(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_PHOTOS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_PHOTOS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_PHOTOS_FAILURE, error }) }
}

function updatePassword (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updatePassword(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_PASSWORD_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_PASSWORD_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_PASSWORD_FAILURE, error }) }
}

function updateEmail (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateEmail(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_EMAIL_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_EMAIL_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_EMAIL_FAILURE, error }) }
}

function updateCoords (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateCoords(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_COORDS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_COORDS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_COORDS_FAILURE, error }) }
}

function updateNotifications (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateNotifications(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_NOTIFICATIONS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_NOTIFICATIONS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_NOTIFICATIONS_FAILURE, error }) }
}

function refreshGuests (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.refreshGuests(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.REFRESH_GUESTS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.REFRESH_GUESTS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.REFRESH_GUESTS_FAILURE, error }) }
}

function refreshNotifications (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.refreshNotifications(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.REFRESH_NOTIFICATIONS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.REFRESH_NOTIFICATIONS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.REFRESH_NOTIFICATIONS_FAILURE, error }) }
}

function updateMessagesFrom (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.updateMessagesFrom(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UPDATE_MESSAGES_FROM_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UPDATE_MESSAGES_FROM_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UPDATE_MESSAGES_FROM_FAILURE, error }) }
}

function refreshMessagesFrom (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.refreshMessagesFrom(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.REFRESH_MESSAGES_FROM_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.REFRESH_MESSAGES_FROM_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.REFRESH_MESSAGES_FROM_FAILURE, error }) }
}

function listMessages (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.listMessages(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIST_MESSAGES_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIST_MESSAGES_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIST_MESSAGES_FAILURE, error }) }
}

function listMessagesFrom (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.listMessagesFrom(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIST_MESSAGES_FROM_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIST_MESSAGES_FROM_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIST_MESSAGES_FROM_FAILURE, error }) }
}

function getBaseInfos (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.getBaseInfos(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.GET_BASE_INFOS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.GET_BASE_INFOS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.GET_BASE_INFOS_FAILURE, error }) }
}

function listInfos (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.listInfos(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIST_INFOS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIST_INFOS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIST_INFOS_FAILURE, error }) }
}

function listInfosFrom (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.listInfosFrom(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIST_INFOS_FROM_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIST_INFOS_FROM_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIST_INFOS_FROM_FAILURE, error }) }
}

function listAllUsers (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.listAllUsers(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIST_ALL_USERS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIST_ALL_USERS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIST_ALL_USERS_FAILURE, error }) }
}

function suggestUsers (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.suggestUsers(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.SUGGEST_USERS_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.SUGGEST_USERS_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.SUGGEST_USERS_FAILURE, error }) }
}

function talkInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.talkInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.TALK_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.TALK_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.TALK_INTERACTION_FAILURE, error }) }
}

function likeInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.likeInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.LIKE_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.LIKE_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.LIKE_INTERACTION_FAILURE, error }) }
}

function reportInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.reportInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.REPORT_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.REPORT_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.REPORT_INTERACTION_FAILURE, error }) }
}

function unlikeInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.unlikeInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UNLIKE_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UNLIKE_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UNLIKE_INTERACTION_FAILURE, error }) }
}

function blockInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.blockInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.BLOCK_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.BLOCK_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.BLOCK_INTERACTION_FAILURE, error }) }
}

function unblockInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.unblockInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.UNBLOCK_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.UNBLOCK_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.UNBLOCK_INTERACTION_FAILURE, error }) }
}

function viewInteraction (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    userService.viewInteraction(informations)
      .then(
        result => {
          dispatch(success(result))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: userConstants.VIEW_INTERACTION_REQUEST, data }) }
  function success (data) { return ({ type: userConstants.VIEW_INTERACTION_SUCCESS, data }) }
  function failure (error) { return ({ type: userConstants.VIEW_INTERACTION_FAILURE, error }) }
}
