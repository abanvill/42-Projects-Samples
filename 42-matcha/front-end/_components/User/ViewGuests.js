// React dependancies

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import { userActions } from '../../_actions'
import ProfilePicture from './Sub/ProfilePicture.js'

// Middlewares

import PropTypes from 'prop-types'
import moment from 'moment'

// Code

class ViewGuests extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentWillMount () {
    const { state } = this
    const { history } = this.props

    if (!state.authentication.user.status.isSigned)
      history.push('/signin')
    if (!state.user.self || !state.user.allUsers)
      history.push('/home')
  }

  componentDidMount () {
    this.props.socket.on('newGuest', (data) => { this.handleNewGuest(data) })
    this.props.onPageLoad()
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state
    var hasChanged = false

    if (nextProps.user !== state.user) {
      state.user = nextProps.user
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate (nextProps) {
    return (true)
  }

  handleNewGuest (data) {
    const { history } = this.props

    /*
    ** Can be optimized, dirty requests are made because of the lacks of time
    */

    this.props.onNewGuest(history)
  }

  generateBlockedGuest (notification) {
    const { state } = this
    const { allUsers } = state.user

    const guestIndex = (allUsers && allUsers.length) ? allUsers.findIndex(i => i.username === notification.username) : -1
    const guest = (guestIndex !== -1) ? allUsers[guestIndex] : undefined
    const photos = (guest && guest.photos) ? guest.photos : []

    const day = moment(notification.at)
    const now = moment()

    return (
      <Link className="list-group-item disabled" key={'guest.' + notification.username} to={`#`} >
        <div className="media">
          <div className="media-left">
            <ProfilePicture id="profilePicture" photos={photos} type="notification-blocked" />
          </div>
          <div className="media-body">
            <h5 className="media-heading">{notification.username}</h5>
            <p>
              {'viewed your profile ' + day.from(now)}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  generateGuest (notification) {
    const { state } = this
    const { allUsers } = state.user

    const guestIndex = (allUsers && allUsers.length) ? allUsers.findIndex(i => i.username === notification.username) : -1
    const guest = (guestIndex !== -1) ? allUsers[guestIndex] : undefined
    const photos = (guest && guest.photos) ? guest.photos : []

    const day = moment(notification.at)
    const now = moment()

    return (
      <Link className="list-group-item" key={'guest.' + notification.username} to={`/user/${notification.username}`} >
        <div className="media">
          <div className="media-left">
            <ProfilePicture id="profilePicture" photos={photos} type="notification" />
          </div>
          <div className="media-body">
            <h5 className="media-heading">{notification.username}</h5>
            <p>
              {'viewed your profile ' + day.from(now)}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  renderUserGuests () {
    const { state } = this
    const { user } = state
    const { self } = state.user
    const guests = (self) ? self.viewed_by.slice() : undefined

    if (guests && guests.length) {
      return (
        <div>
          { guests.map((guest, index) => {
            const blockedTo = (self && self.blocked_to.indexOf(guest.username) !== -1)
            const blockedBy = (self && self.blocked_by.indexOf(guest.username) !== -1)

            if (!blockedTo && !blockedBy)
              return (this.generateGuest(guest))
            return (this.generateBlockedGuest(guest))
          })}
        </div>
      )
    }
    else if (guests && !guests.length && user.requested)
      return (<div className="msg-placeholder">{'No guests yet'}</div>)
    return (<i className="fa fa-spinner fa-pulse fa-fw fa-3x" />)
  }

  render () {
    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-users" />{' '}{ 'Guests'}</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="list-group">
              { this.renderUserGuests() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ViewGuests.defaultProps = {
  authentication: {},
  user: {}
}

ViewGuests.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onEmptyUser: PropTypes.func.isRequired,
  onEmptyUsers: PropTypes.func.isRequired,
  onNewGuest: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmptyUser: (history, informations) => {
      dispatch(userActions.listInfos(history, {}))
    },
    onEmptyUsers: (history, informations) => {
      dispatch(userActions.listAllUsers(history, {}))
    },
    onNewGuest: (history, informations) => {
      dispatch(userActions.refreshGuests(history, {}))
    },
    onPageLoad: (history, informations) => {}
  }
}

const connectedViewGuests = connect(mapStateToProps, mapDispatchToProps)(ViewGuests)
export { connectedViewGuests as ViewGuests }
