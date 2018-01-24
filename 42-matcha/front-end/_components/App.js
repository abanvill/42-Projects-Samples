// React dependancies

import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

// App dependancies

import { userActions } from '../_actions'

import {
  ActivateAccount,
  ChangePassword,
  EditAccount,
  EditProfile,
  ForgotPassword,
  Header,
  Home,
  Login,
  OAuth,
  Register,
  RegisterMessage,
  Search,
  Thread,
  Threads,
  ViewGuests,
  ViewNotifications,
  ViewProfile
} from './'

// Middlewares

import io from 'socket.io-client'
import PropTypes from 'prop-types'

// Code

const socket = io('http://localhost:4242')

const BindedThread = (props) => {
  return (
    <Thread
      socket={socket}
      {...props}
    />
  )
}

const BindedViewNotifications = (props) => {
  return (
    <ViewNotifications
      socket={socket}
      {...props}
    />
  )
}

const BindedViewGuests = (props) => {
  return (
    <ViewGuests
      socket={socket}
      {...props}
    />
  )
}

const NotFound = (props) => {
  return (
    <div className="not-found-wrapper"><div className="not-found" /></div>
  )
}

class App extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentDidMount () {
    const { state, props } = this
    const { location } = this.props

    if (location.pathname === '/oauth/signin/' && location.search.length && location.search[0] === '?')
      props.history.push(props.location.pathname + props.location.search.slice(1))
  }

  componentWillReceiveProps (nextProps) {
    const { state } = this
    var hasChanged = false

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      hasChanged = true
    }
    if (nextProps.user !== state.user) {
      // if (nextProps.user.self)
      //   this.handleSocketAuth(nextProps.user.self.username)
      state.user = nextProps.user
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate () { return (true) }

  render () {
    const { props } = this

    return (
      <div>
        <Header socket={socket} />
        <Switch>
          <Route component={ActivateAccount} path="/activate/:account&:token" />
          <Route component={ChangePassword} path="/change-password/:account&:token" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={OAuth} path="/oauth/signin/code=:code" />
          <Route component={Login} path="/signin" />
          <Route component={Register} exact path="/signup" />
          <Route component={RegisterMessage} exact path="/signup/activate" />
          <Route component={BindedViewGuests} exact path="/guests" />
          <Route component={BindedThread} exact path="/messages/:username" />
          <Route component={BindedViewNotifications} exact path="/notifications" />
          <Route component={EditAccount} path="/account/edit" />
          <Route component={EditProfile} path="/profile/edit" />
          <Route component={Home} {...props} exact path="/home" />
          <Route component={Search} {...props} path="/search" />
          <Route component={Threads} exact path="/messages" />
          <Route component={ViewProfile} path="/user/:username" />

          <Route component={NotFound} path="*" />
        </Switch>
      </div>
    )
  }
}

App.defaultProps = {
  authentication: {},
  user: {}
}

App.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: (history) => {
      // dispatch(userActions.listInfos(history, {}))
    }
  }
}

const connectedApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
export { connectedApp as App }
