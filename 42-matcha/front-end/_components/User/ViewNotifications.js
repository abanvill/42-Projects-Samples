// React dependancies

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import ProfilePicture from './Sub/ProfilePicture.js'
import { userActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'
import moment from 'moment'

// Code

class ViewNotifications extends React.Component
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
    this.props.onPageLoad(history, {})
  }

  componentDidMount () {
    this.props.socket.on('newNotification', (data) => { this.handleNewNotification(data) })
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

  handleNewNotification (data) {
    const { history } = this.props

    /*
    ** Can be optimized, dirty requests are made because of the lacks of time
    */

    this.props.onNewNotification(history, {})
  }

  generateNotification (notification) {
    const { state } = this
    const { allUsers } = state.user

    const day = moment(notification.at)
    const now = moment()

    const guestIndex = (allUsers && allUsers.length) ? allUsers.findIndex(i => i.username === notification.source) : -1
    const guest = (guestIndex !== -1) ? allUsers[guestIndex] : undefined
    const photos = (guest && guest.photos) ? guest.photos : []

    switch (notification.type) {
      case ('like'):
        return (
          <Link
            className={`list-group-item notification-info ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`/user/${notification.source}`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-info">
                  {'liked your profile ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
      case ('unlike'):
        return (
          <Link
            className={`list-group-item notification-danger ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`/user/${notification.source}`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-danger">
                  {'unliked your profile ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
      case ('match'):
        return (
          <Link
            className={`list-group-item notification-success ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`/user/${notification.source}`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-success">
                  {'matched with you ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
    }
  }

  generateBlockedNotification (notification) {
    const { state } = this
    const { allUsers } = state.user

    const day = moment(notification.at)
    const now = moment()

    const guestIndex = (allUsers && allUsers.length) ? allUsers.findIndex(i => i.username === notification.source) : -1
    const guest = (guestIndex !== -1) ? allUsers[guestIndex] : undefined
    const photos = (guest && guest.photos) ? guest.photos : []

    switch (notification.type) {
      case ('like'):
        return (
          <Link
            className={`list-group-item notification-info ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`#`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification-blocked" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-info">
                  {'liked your profile ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
      case ('unlike'):
        return (
          <Link
            className={`list-group-item notification-danger ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`#`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification-blocked" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-danger">
                  {'unliked your profile ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
      case ('match'):
        return (
          <Link
            className={`list-group-item notification-success ${(notification.read_at) ? 'disabled' : ''}`}
            key={'notification.' + notification.at + '.type.' + notification.type + '.by.' + notification.source}
            to={`#`}
          >
            <div className="media">
              <div className="media-left">
                <ProfilePicture id="profilePicture" photos={photos} type="notification-blocked" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{notification.source}</h5>
                <p className="text-success">
                  {'matched with you ' + day.from(now)}
                </p>
              </div>
            </div>
          </Link>
        )
    }
  }

  renderUserNotifications () {
    const { state } = this
    const { user } = state
    const { self } = state.user
    const notifications = (self) ? self.notifications.slice() : undefined

    if (notifications && notifications.length) {
      return (
        <div>
          { notifications.reverse().map((notification, index) => {
            const blockedTo = (self && self.blocked_to.indexOf(notification.source) !== -1)
            const blockedBy = (self && self.blocked_by.indexOf(notification.source) !== -1)

            if (!blockedTo && !blockedBy)
              return (this.generateNotification(notification))
            return (this.generateBlockedNotification(notification))
          })}
        </div>
      )
    }
    else if (notifications && !notifications.length && user.requested)
      return (<div className="msg-placeholder">{'No notifications yet'}</div>)
    return (<i className="fa fa-spinner fa-pulse fa-fw fa-3x" />)
  }

  render () {
    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-heartbeat" />{' '}{ 'Notifications' }</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="list-group">
              <a
                className="list-group-item notification"
                key={'notification.action.markasread'}
                onClick={() => { this.props.onMarkAsRead(this.props.history, {}) }}
              >
                <div className="media">
                  <div className="media-body">
                    <h5 className="media-heading text-center"><i className="fa fa-check-square-o" /> {'Mark all as read'}</h5>
                  </div>
                </div>
              </a>
              { this.renderUserNotifications() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ViewNotifications.defaultProps = {
  authentication: {},
  user: {}
}

ViewNotifications.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onEmptyUser: PropTypes.func.isRequired,
  onEmptyUsers: PropTypes.func.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onNewNotification: PropTypes.func.isRequired,
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
    onMarkAsRead: (history, informations) => {
      dispatch(userActions.updateNotifications(history, {}))
    },
    onNewNotification: (history, informations) => {
      dispatch(userActions.refreshNotifications(history, {}))
    },
    onPageLoad: (history, informations) => {}
  }
}

const connectedViewNotifications = connect(mapStateToProps, mapDispatchToProps)(ViewNotifications)
export { connectedViewNotifications as ViewNotifications }
