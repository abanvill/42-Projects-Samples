// React dependancies

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// App dependancies

import { authActions, userActions } from '../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        notifications: 0,
        messages: 0,
        socketAuth: false,
        views: 0
      },
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentDidMount () {
    const { state } = this

    if (state.authentication.user.status.isSigned)
    {
      this.props.socket.on('newGuest', (data) => { this.handleNewGuest(data) })
      this.props.socket.on('newMatch', (data) => { this.handleNewMatch(data) })
      this.props.socket.on('newNotification', (data) => { this.handleNewNotification(data) })
      this.props.socket.on('newMessage', (data) => { this.handleNewMessage(data) })
      this.props.socket.on('newMessageFrom', (data) => { this.handleNewMessageFrom(data) })

      this.props.onNewGuest()
      this.props.onNewMessage()
      this.props.onNewNotification()
    }
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state
    var hasChanged = false

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      hasChanged = true
    }
    if (nextProps.user.self)
      this.handleSocketAuth(nextProps.user.self.username)
    if (nextProps.user && nextProps.user !== state.user) {
      state.user = nextProps.user
      if (state.user.self) {
        if (state.informations.notifications !== state.user.self.informations.notifications)
          state.informations.notifications = state.user.self.informations.notifications
        if (state.informations.messages === 0)
          state.informations.messages = state.user.self.informations.messages
        if (state.informations.views === 0)
          state.informations.views = state.user.self.informations.views
      }
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate (props) { return (true) }

  handleNewMessageFrom (data) {
    const { history } = this.props
    this.props.onNewMessageFrom(history, data)
  }

  handleNewMatch (data) {
    const { history } = this.props
    this.props.onNewMatch(history, {})
  }

  handleNewGuest (data) {
    const { state } = this

    state.informations.views = data
    this.setState(state)
  }

  handleNewMessage (data) {
    const { state } = this

    state.informations.messages = data
    this.setState(state)
  }

  handleNewNotification (data) {
    const { state } = this

    state.informations.notifications = data
    this.setState(state)
  }

  handleLogout () {
    const { state } = this

    state.user = undefined
    state.informations.socketAuth = false
    this.setState(state)
    this.props.onLogout(this.props.history)
  }

  handleSocketAuth (username) {
    const { state } = this

    if (state.informations.socketAuth === false) {
      this.props.socket.emit('whoami', username)
      state.informations.socketAuth = true
      this.setState(state)
    }
  }

  isLinkActive (url) {
    if (this.props.location.pathname === url)
      return ('active')
    return ('')
  }

  renderLoginButton () {
    return (
      <li>
        <Link to="/signin">
          {'Signin'}
          <span className="sr-only">{'(current)'}</span>
        </Link>
      </li>
    )
  }

  renderRegisterButton () {
    return (
      <li>
        <Link to="/signup">
          {'Register'}
          <span className="sr-only">{'(current)'}</span>
        </Link>
      </li>
    )
  }

  renderAuthPart () {
    const { state } = this
    const { authentication } = state
    const user = (authentication) ? authentication.user : undefined
    const status = (user) ? user.status : undefined

    if (status && status.isSigned === true) {
      return (
        <ul className="nav navbar-nav navbar-right">
          { this.renderHome() }
          { this.renderSearch() }
          { this.renderViews() }
          { this.renderMessages() }
          { this.renderNotifications() }
          { this.renderAccountDropdown() }
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          { this.renderLoginButton() }
          { this.renderRegisterButton() }
        </ul>
      )
    }
  }

  renderHome () {
    return (
      <li className={this.isLinkActive('/home')}>
        <Link to="/home">
          <i className="fa fa-home fa-fw " />
          <span className="">
            { ' Home ' }
          </span>
          <span className="sr-only">{'Home alert button'}</span>
        </Link>
      </li>
    )
  }

  renderSearch () {
    return (
      <li className={this.isLinkActive('/search')}>
        <Link to="/search">
          <i className="fa fa-search fa-fw " />
          <span className="">
            { ' Search ' }
          </span>
          <span className="sr-only">{'Search alert button'}</span>
        </Link>
      </li>
    )
  }

  renderViews () {
    const { state } = this
    const { informations } = state
    const { views } = informations

    return (
      <li className={this.isLinkActive('/guests')}>
        <Link to="/guests">
          <i className="fa fa-eye fa-fw " />
          <span className="hidden-lg hidden-md hidden-sm">
            { ' Guests ' }
          </span>
          <span className="badge">{views}</span>
          <span className="sr-only">{'Guests alert button'}</span>
        </Link>
      </li>
    )
  }

  renderMessages () {
    const { state } = this
    const { informations } = state
    const { messages } = informations

    return (
      <li className={this.isLinkActive('/messages')}>
        <Link to="/messages">
          <i className="fa fa-envelope-o fa-fw " />
          <span className="hidden-lg hidden-md hidden-sm">
            { ' Messages ' }
          </span>
          <span className="badge">{messages}</span>
          <span className="sr-only">{'Messages alert button'}</span>
        </Link>
      </li>
    )
  }

  renderNotifications () {
    const { state } = this
    const { informations } = state
    const { notifications } = informations

    return (
      <li className={this.isLinkActive('/notifications')}>
        <Link to="/notifications">
          <i className="fa fa-bell-o fa-fw" />
          <span className="hidden-lg hidden-md hidden-sm">
            { ' Notifications ' }
          </span>
          <span className="badge">{notifications}</span>
          <span className="sr-only">{'Notifications alert button'}</span>
        </Link>
      </li>
    )
  }

  renderAccountDropdown () {
    const { state } = this
    const { user, authentication } = state
    const { self } = user
    const { status } = authentication.user

    const username = (self) ? self.username : undefined
    const firstName = (self) ? self.first_name : undefined

    if (status && status.isSigned === true)
    {
      return (
        <li className="dropdown">
          <a aria-expanded="false"
            aria-haspopup="true"
            className="dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
          >
            <span style={{ textTransform: 'capitalize' }}>
              { firstName }
              <span className="caret" />
            </span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to={`/user/${username}`}>
                { 'Signed as ' }<strong>{ username }</strong>
              </Link>
              <span className="sr-only">{'(current)'}</span>
            </li>
            <li className="divider" role="separator" />
            <li>
              <Link to="/profile/edit">
                {'Edit profile'}
              </Link>
            </li>
            <li>
              <Link to="/account/edit">
                {'Edit account'}
              </Link>
            </li>
            <li className="divider" role="separator" />
            <li>
              <Link onClick={(e) => { this.handleLogout() }} to="/">
                { 'Sign out' }
                <span className="sr-only">{'(current)'}</span>
              </Link>
            </li>
          </ul>
        </li>
      )
    }
    else {
      return (<li />)
    }
  }

  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/home">
              <img src="/HeaderLogotypeBold@2x.png" />
            </Link>
            <button aria-expanded="false"
              className="navbar-toggle collapsed"
              data-target="#bs-example-navbar-collapse-1"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">{'Toggle navigation'}</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-right">
              { this.renderAuthPart() }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Header.defaultProps = {
  authentication: {},
  user: {}
}

Header.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onEmptyUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNewGuest: PropTypes.func.isRequired,
  onNewMatch: PropTypes.func.isRequired,
  onNewMessage: PropTypes.func.isRequired,
  onNewMessageFrom: PropTypes.func.isRequired,
  onNewNotification: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmptyUser: (history) => {
      dispatch(userActions.listInfos(history, {}))
    },
    onLogout: (history) => {
      dispatch(userActions.logout(history, {}))
      dispatch(authActions.logout(history, {}))
    },
    onNewMatch: (history, data) => {
      dispatch(userActions.listInfos(history, {}))
    },
    onNewGuest: () => { },
    onNewMessage: () => { },
    onNewMessageFrom: (history, data) => {
      dispatch(userActions.refreshMessagesFrom(history, { username: data }))
    },
    onNewNotification: () => { }
  }
}

const connectedHeader = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
export { connectedHeader as Header }
