// React dependancies

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// App dependancies

import ProfilePicture from './User/Sub/ProfilePicture.js'
import { userActions } from '../_actions'

// Middlewares

import PropTypes from 'prop-types'
import FilterForm from './User/Sub/FilterForm.js'

// Code

class Home extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      authentication: { ...props.authentication },
      filtered: [],
      user: { ...props.user }
    }
  }

  componentWillMount () {
    const { state } = this
    const { history } = this.props

    state.user.error = undefined
    if (!state.authentication.user.status.isSigned)
      this.props.history.push('/signin')
    else
      this.props.onPageLoad(history)
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state
    var hasChanged = false

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      hasChanged = true
    }
    if (nextProps.user !== state.user)
    {
      state.user = nextProps.user
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate () {
    return (true)
  }

  generateUserThumbnail (user) {
    const { state } = this
    const { self } = state.user
    const { username, photos } = user

    const blockedTo = (self && self.blocked_to.indexOf(username) !== -1)
    const blockedBy = (self && self.blocked_by.indexOf(username) !== -1)

    if (username !== state.user.self.username)
    {
      const classes = []

      classes.push('thumbnail')

      if (blockedTo)
        classes.push('blocked')
      else if (user.is_online)
        classes.push('online')
      else
        classes.push('offline')

      if (blockedBy || !photos || !photos.length)
        return (<span key={'span.' + user.username} />)
      return (
        <div className={`col-xs-6 col-sm-2 col-md-2`} key={'thumbnail.' + username}>
          <Link className={classes.map((key) => { return key }).join(' ')}
            to={`/user/${username}`}
          >
            <ProfilePicture id="profilePicture" photos={photos} type="grid-thumbnail" />
          </Link>
          <div className="caption text-center">
            <h3 style={{ 'textTransform': 'capitalize', 'wordBreak': 'break-all' }}>{`${user.first_name}`}</h3>
          </div>
        </div>
      )
    }
  }

  onFilter (filtered) {
    const { state } = this

    state.filtered = filtered
    this.setState(state)
  }

  renderAllUserGrid () {
    const { state } = this
    const { self, allUsers } = state.user

    if (!self)
      return (<div />)
    return (
      <div className="row">
        { allUsers && allUsers.length && allUsers.map((user) => {
          return (this.generateUserThumbnail(user))
        })}
      </div>
    )
  }

  renderSuggestedUserGrid () {
    const { state } = this
    const { filtered } = state
    const { self } = state.user

    if (!self)
      return (<div />)
    if (filtered && filtered.length) {
      return (
        <div className="row">
          { filtered.map((user) => {
            return (this.generateUserThumbnail(user))
          })}
        </div>
      )
    }
  }

  render () {
    const { self } = this.state.user

    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="col-md-4">
          <div className="page-header col-md-12">
            <h1><i className="fa fa-gears" />{' '}{'Filters'}</h1>
          </div>
          <FilterForm onFilter={(filtered) => { this.onFilter(filtered) }} self={self} users={this.state.user.suggestedUsers} />
        </div>
        <div className="col-md-8">
          <div className="page-header col-md-12">
            <h1><i className="fa fa-hand-spock-o" />{' '}{'Suggested users'}</h1>
          </div>
          { this.renderSuggestedUserGrid() }
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  authentication: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onEmptyUser: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmptyUser: (history) => {
    },
    onPageLoad: (history) => {
      dispatch(userActions.listInfos(history, {}))
      dispatch(userActions.listAllUsers(history, {}))
      dispatch(userActions.suggestUsers(history, {}))
    }
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export { connectedHome as Home }
