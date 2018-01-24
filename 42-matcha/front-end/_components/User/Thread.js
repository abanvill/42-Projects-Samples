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

class Thread extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        username: props.match.params.username,
        content: ''
      },
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentWillMount () {
    const { history } = this.props
    const { state } = this
    const { self } = state.user

    var legit = false

    if (!state.authentication.user.status.isSigned)
      history.push('/signin')
    if (self) {
      const { matches, username } = self

      const blockedTo = (self.blocked_to.indexOf(username) !== -1)
      const blockedBy = (self.blocked_by.indexOf(username) !== -1)
      const blocked = (blockedTo || blockedBy)

      if (blocked)
        history.push('/messages')
      if (matches) {
        for (var i = 0; i < matches.length; i++) {
          if (matches[i].username === this.state.informations.username)
            legit = true
        }
      }
    }
    if (!legit) history.push('/messages')

    this.props.onPageLoad(history, state.informations)
  }

  componentDidMount () {
    this.scrollUpdate()
  }

  shouldComponentUpdate (nextProps) {
    this.scrollUpdate()
    return (true)
  }

  handleChange (e) {
    const state = this.state
    const { value } = e.target

    state.informations['content'] = value
    this.setState(state)
  }

  handleSubmit (e) {
    e.preventDefault()

    const state = this.state
    const { content, username } = this.state.informations
    const { history } = this.props

    state.informations.submitted = true
    state.informations.content = ''

    this.setState(state)

    if (username && content) {
      const informations = {
        username: username,
        content: content
      }
      this.props.onTalkInteraction(history, informations)
      this.scrollUpdate()
    }
  }

  scrollUpdate () {
    setTimeout(function () {
      const { msgWrapper } = this.refs
      if (msgWrapper)
        msgWrapper.scrollTop = msgWrapper.scrollHeight
    }.bind(this), 100)
  }

  renderMessages () {
    return (<div />)
  }

  renderFromPageHeader () {
    const { from } = this.props.user

    if (from) {
      const status = from.is_online ? { color: 'limegreen' } : { color: 'orangered' }
      const firstName = from.first_name
      const lastName = from.last_name
      const username = from.username

      const { score } = from
      const { photos } = from

      return (
        <div className="usr-profile-header">
          <div className="row">
            <div className="col-xs-12 text-center">
              <div className="usr-profile-photo">
                <Link to={`/user/${username}`}>
                  <ProfilePicture id="profilePicture" photos={photos} type="header" />
                </Link>
              </div>
              <div className="usr-profile-infos-score-wrapper">
                <strong>{ score }</strong>{' pts'}
              </div>
            </div>
            <div className="col-xs-12">
              <div className="usr-profile-infos">
                <h1>
                  <i className="fa fa-circle" style={status} />
                  {' '}
                  <span className="usr-profile-infos-first-name">
                    { firstName }
                  </span>
                  { ' ' }
                  <span className="usr-profile-infos-last-name">
                    { lastName }
                  </span><br />
                </h1>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (<i className="fa fa-spinner fa-pulse fa-fw fa-3x" />)
    }
  }

  renderUserMessages () {
    const { user } = this.props
    const { self } = user
    const { username } = this.state.informations
    const messages = (self) ? self.threads[username] : undefined

    if (user.requested && !messages)
      return (<div className="msg-placeholder">{'No messages yet'}</div>)

    return (
      <div>
        { messages && messages.length && messages.map((message, index) => {
          const day = moment(messages.submitted_at)
          const now = moment()

          if (message.author === username) {
            return (
              <div className="col-xs-12" key={message.submitted_at + message.author}>
                <div className="pull-left msg-target">
                  <span className="msg-content">
                    <p>{message.content}</p>
                  </span><br />
                  <span className="msg-datetime">{day.from(now)}</span>
                </div>
              </div>
            )
          } else {
            return (
              <div className="col-xs-12" key={message.submitted_at + message.author}>
                <div className="pull-right msg-source">
                  <span className="msg-content">
                    <p>{message.content}</p>
                  </span><br />
                  <span className="msg-datetime">{day.from(now)}</span>
                </div>
              </div>
            )
          }
        }) }
      </div>
    )
  }

  renderMessageForm () {
    return (
      <div>
        <form name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="input-desktop-wrapper hidden-xs">
            <div className="input-group">
              <input className="form-control desktop"
                name="contentDesktop"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="Desktop text input"
                type="text"
                value={this.state.informations.content}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="fa fa-send-o" />
                </button>
              </span>
            </div>
          </div>
          <div className="input-mobile-wrapper visible-xs">
            <div className="input-group">
              <input className="form-control mobile"
                name="contentMobile"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="Mobile text input"
                type="text"
                value={this.state.informations.content}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="fa fa-send-o" />
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }

  render () {
    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header">
          <div>{ this.renderFromPageHeader() }</div>
        </div>
        <div className="msg-wrapper" ref="msgWrapper">
          { this.renderUserMessages() }
        </div>
        <div className="msg-input-wrapper">
          { this.renderMessageForm() }
        </div>
      </div>
    )
  }
}

Thread.defaultProps = {
  authentication: {},
  user: {}
}

Thread.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  onTalkInteraction: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: (history, informations) => {
      dispatch(userActions.listInfosFrom(history, { username: informations.username }))
    },
    onTalkInteraction: (history, informations) => {
      dispatch(userActions.talkInteraction(history, { username: informations.username, content: informations.content }))
    }
  }
}

const connectedThread = connect(mapStateToProps, mapDispatchToProps)(Thread)
export { connectedThread as Thread }
