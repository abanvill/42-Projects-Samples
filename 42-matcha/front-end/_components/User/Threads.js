// React dependancies

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import ProfilePicture from './Sub/ProfilePicture.js'
import { userActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class Threads extends React.Component
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

  shouldComponentUpdate () { return (true) }

  renderThreads () {
    const rows = []
    const { state } = this
    const { user } = state
    const { allUsers, self } = user

    if (self && self.threads)
    {
      const { threads } = self

      if (!threads.length < 1)
        return (<p>{'No matches for now, maybe later, dont give up !'}</p>)

      for (var username in threads) {
        const thread = threads[username]
        const blockedTo = (self.blocked_to.indexOf(username) !== -1)
        const blockedBy = (self.blocked_by.indexOf(username) !== -1)
        const blocked = (blockedTo || blockedBy)

        if (thread && thread.length && !blocked) {
          const { author } = thread[thread.length - 1]
          const selfUsername = (user && user.self) ? user.self.username : undefined
          const alias = (selfUsername && author === selfUsername) ? 'me' : author

          const targetIndex = (allUsers) ? allUsers.findIndex(i => i.username === username) : -1
          const photos = (targetIndex !== -1) ? allUsers[targetIndex].photos : []

          rows.push(
            <Link className="list-group-item" key={username} to={'/messages/' + username}>
              <div className="media">
                <div className="media-left">
                  <ProfilePicture id="profilePicture" photos={photos} type="notification" />
                </div>
                <div className="media-body">
                  <span className="badge pull-right">{thread.length}</span>
                  <h5 className="media-heading">{username}</h5>
                  <p>
                    <strong style={{'textTransform': 'capitalize'}}>
                      { alias }
                    </strong>
                    {': '}
                    {thread[thread.length - 1].content}
                  </p>
                </div>
              </div>
            </Link>
          )
        }
      }
      return (<div>{rows}</div>)
    }
    return (<i className="fa fa-spinner fa-pulse fa-3x fa-fw" />)
  }

  render () {
    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-envelope-open-o" />{' '}{'Messages'}</h1>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="list-group">

              { this.renderThreads() }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

Threads.defaultProps = {
  authentication: {},
  user: {}
}

Threads.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onEmptyUser: PropTypes.func.isRequired,
  onEmptyUsers: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
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
    onPageLoad: (history, informations) => {
      dispatch(userActions.listMessages(history, {}))
    }
  }
}

const connectedThreads = connect(mapStateToProps, mapDispatchToProps)(Threads)
export { connectedThreads as Threads }
