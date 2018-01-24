import { authConstants } from '../_constants'
import { authService } from '../_services'

export const authActions = {
  activateAccount,
  changePassword,
  forgotPassword,
  login,
  logout,
  oauthLogin,
  register
}

function activateAccount (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.activateAccount(informations)
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

  function request (data) { return ({ type: authConstants.ACTIVATE_ACCOUNT_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.ACTIVATE_ACCOUNT_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.ACTIVATE_ACCOUNT_FAILURE, error }) }
}

function changePassword (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.changePassword(informations)
      .then(
        result => {
          dispatch(success(result))
          history.push('/signin')
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: authConstants.CHANGE_PASSWORD_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.CHANGE_PASSWORD_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.CHANGE_PASSWORD_FAILURE, error }) }
}

function forgotPassword (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.forgotPassword(informations)
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

  function request (data) { return ({ type: authConstants.FORGOT_PASSWORD_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.FORGOT_PASSWORD_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.FORGOT_PASSWORD_FAILURE, error }) }
}

function register (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.register(informations)
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

  function request (data) { return ({ type: authConstants.REGISTER_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.REGISTER_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.REGISTER_FAILURE, error }) }
}

function oauthLogin (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.oauthLogin(informations)
      .then(
        result => {
          dispatch(success({ token: result.token }))
          history.push('/home')
          // history.push('/activate')
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: authConstants.OAUTH_LOGIN_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.OAUTH_LOGIN_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.OAUTH_LOGIN_FAILURE, error }) }
}

function login (history, informations) {
  return (dispatch) => {
    dispatch(request({ informations }))
    authService.login(informations)
      .then(
        result => {
          dispatch(success({ token: result.token }))
          history.push('/home')
          // history.push('/activate')
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (data) { return ({ type: authConstants.LOGIN_REQUEST, data }) }
  function success (data) { return ({ type: authConstants.LOGIN_SUCCESS, data }) }
  function failure (error) { return ({ type: authConstants.LOGIN_FAILURE, error }) }
}

function logout (history, informations) {
  return (dispatch) => {
    dispatch(request())

    authService.logout(informations)
      .then(
        result => {
          dispatch(success())
          history.push('/signin')
        },
        error => {
          dispatch(failure(error))
        }
      )
  }

  function request () { return ({ type: authConstants.LOGOUT_REQUEST }) }
  function success () { return ({ type: authConstants.LOGOUT_SUCCESS }) }
  function failure (error) { return ({ type: authConstants.LOGOUT_FAILURE, error }) }
}
