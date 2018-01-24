import { authConstants } from '../_constants'
import { authService } from '../_services'
// import { alertActions } from ./
import { history } from '../_helpers'

export const userActions = {
  login
}

function login (username, password) {
  return dispatch => {
    dispatch(request({ username }))

    authService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user))
          history.push('/')
        },
        (error) => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }

  function request (user) { return ({ type: authConstants.LOGIN_REQUEST, user }) }
  function success (user) { return ({ type: authConstants.LOGIN_SUCCESS, user }) }
  function failure (user) { return ({ type: authConstants.LOGIN_FAILURE, error }) }
}
