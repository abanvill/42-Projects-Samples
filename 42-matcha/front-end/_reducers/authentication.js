import { authConstants } from '../_constants'

const token = (localStorage.getItem('token') !== 'undefined')
  ? JSON.parse(localStorage.getItem('token'))
  : undefined

const initialState = { user: {} }

initialState.user = (token)
  ? { status: { loggingIn: false, isSigned: true }, token: token }
  : { status: { loggingIn: false, isSigned: false }, token: '' }

export function authentication (state = initialState, action) {
  switch (action.type) {
    /*
    ** Login
    */

    case (authConstants.LOGIN_REQUEST):

      state.user.status.loggingIn = true
      state.user.status.isSigned = false
      state.user.token = ''
      return (state)

    case (authConstants.LOGIN_SUCCESS):

      state.user.status.loggingIn = false
      state.user.status.isSigned = true
      state.user.token = action.data.token
      return (state)

    case (authConstants.LOGIN_FAILURE):

      state.user.status.loggingIn = false
      return ({
        ...state,
        error: action.error
      })

    case (authConstants.OAUTH_LOGIN_REQUEST):

      state.user.status.loggingIn = true
      state.user.status.isSigned = false
      state.user.token = ''
      return (state)

    case (authConstants.OAUTH_LOGIN_SUCCESS):

      state.user.status.loggingIn = false
      state.user.status.isSigned = true
      state.user.token = action.data.token
      return (state)

    case (authConstants.OAUTH_LOGIN_FAILURE):

      state.user.status.loggingIn = false
      return ({
        ...state,
        error: action.error
      })

    /*
    ** Logout
    */

    case (authConstants.LOGOUT_REQUEST):

      state.user.status.loggingIn = false
      return (state)

    case (authConstants.LOGOUT_SUCCESS):

      state.user.status.loggingIn = false
      state.user.status.isSigned = false
      state.user.token = ''
      return (state)

    case (authConstants.LOGOUT_FAILURE):
      return (state)

    /*
    ** Register
    */

    case (authConstants.REGISTER_REQUEST):
      return (state)

    case (authConstants.REGISTER_SUCCESS):
      return ({
        ...state,
        registered: true
      })

    case (authConstants.REGISTER_FAILURE):
      return ({
        ...state,
        error: action.error
      })

    /*
    ** Forgot password
    */

    case (authConstants.FORGOT_PASSWORD_REQUEST):
      return (state)

    case (authConstants.FORGOT_PASSWORD_SUCCESS):
      return (state)

    case (authConstants.FORGOT_PASSWORD_FAILURE):
      return ({
        ...state,
        error: action.error
      })

    /*
    ** Change password
    */

    case (authConstants.CHANGE_PASSWORD_REQUEST):
      return (state)

    case (authConstants.CHANGE_PASSWORD_SUCCESS):
      return (state)

    case (authConstants.CHANGE_PASSWORD_FAILURE):
      return ({
        ...state,
        error: action.error
      })

    /*
    ** Activate account
    */

    case (authConstants.ACTIVATE_ACCOUNT_REQUEST):
      return (state)

    case (authConstants.ACTIVATE_ACCOUNT_SUCCESS):
      return (state)

    case (authConstants.ACTIVATE_ACCOUNT_FAILURE):
      return ({
        ...state,
        error: action.error
      })

    /*
    ** Default
    */

    default:
      return (state)
  }
}
