// React dependancies

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import { Button, Carousel, Modal } from 'react-bootstrap'
import ProfilePicture from './Sub/ProfilePicture.js'
import { userActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'
import moment from 'moment'

// Code

function getGenderAlias (indice) {
  const gender = [
    <span key={'info.female'}><i className="fa fa-venus" />{' Woman'}</span>,
    <span key={'info.female'}><i className="fa fa-mars" />{' Man'}</span>
  ]
  if (isNaN(indice) === false && indice >= 0 && indice < gender.length)
    return (gender[indice])

  return (<span><i className="fa fa-reddit-alien" key={'info.alien'} />{' Alien'}</span>)
}

function getOrientationAlias (indice) {
  const orientation = [
    'Heterosexual',
    'Gay',
    'Bisexual'
  ]
  if (isNaN(indice) === false && indice >= 0 && indice < orientation.length)
    return (orientation[indice])

  return ('Alien')
}

class ViewProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        report: {
          comment: undefined,
          showModal: false,
          type: 0
        },
        submitted: false,
        username: props.match.params.username
      },
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentWillMount () {
    const { state } = this

    state.user.error = undefined
    if (!state.authentication.user.status.isSigned)
      this.props.history.push('/signin')
  }

  componentDidMount () {
    const { state } = this
    const { informations } = state
    const { history } = this.props

    if (state.user.self)
    {
      if (state.user.self.blocked_by.indexOf(state.informations.username) !== -1 || state.user.self.blocked_to.indexOf(state.informations.username) !== -1)
        history.push('/home')
      this.props.requestProfileInfos(history, { username: state.informations.username })
      if (informations.username !== state.user.self.username)
        this.props.triggerViewInteraction(history, informations)
    }
    else
      this.props.history.push('/home')
  }

  componentWillReceiveProps (nextProps) {
    const { state } = this
    var hasChanged = false

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      hasChanged = true
    }
    if (nextProps.user.self !== state.user.self) {
      state.user.self = nextProps.user.self
      hasChanged = true
    }
    if (nextProps.user.from !== state.user.from) {
      state.user.from = nextProps.user.from
      hasChanged = true
    }
    if (nextProps.match.params.username !== this.props.match.params.username) {
      const { history } = nextProps
      const { username } = nextProps.match.params
      const { self } = nextProps.user

      if (self.blocked_by.indexOf(username) !== -1 || self.blocked_to.indexOf(username) !== -1)
        history.push('/home')
      else
        nextProps.requestProfileInfos(history, { username: username })
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate (nextProps, nextState) { return (true) }

  handleLikeAction () {
    const { state } = this
    const { self } = state.user
    const { username } = state.informations
    const { history } = this.props

    if (username !== self.username)
      this.props.onLikeInteraction(history, { username })
  }

  handleReportAction () {
    const { state } = this
    const { self } = state.user
    const { username } = state.informations
    const { history } = this.props

    if (username !== self.username)
    {
      this.props.onReportInteraction(history, { username: username, type: 0 })
      this.props.onBlockInteraction(history, { username })
      this.handleReportModal('hide')
      history.push('/home')
    }
  }

  handleUnlikeAction () {
    const { state } = this
    const { self } = state.user
    const { username } = state.informations
    const { history } = this.props

    if (username !== self.username)
      this.props.onUnlikeInteraction(history, { username })
  }

  handleBlockAction () {
    const { state } = this
    const { self } = state.user
    const { username } = state.informations
    const { history } = this.props

    if (username !== self.username)
      this.props.onBlockInteraction(history, { username })
  }

  handleUnblockAction () {
    const { state } = this
    const { self } = state.user
    const { username } = state.informations
    const { history } = this.props

    if (username !== self.username)
      this.props.onUnblockInteraction(history, { username })
  }

  handleReportModal (action) {
    const { state } = this

    switch (action) {
      case ('show'):
        state.informations.report.showModal = true
        break
      case ('hide'):
        state.informations.report.showModal = false
        break
    }
    this.setState(state)
  }

  renderGrid () {
    const { self } = this.state.user
    const photos = (self) ? self.photos : undefined

    if (photos && photos.length) {
      return (
        <div>
          { photos.map((photo, index) => {
            return (<img key={'grid-img.' + photo.path} src={'http://localhost:4242/' + photo.path} />)
          })}
        </div>
      )
    }
    else
      return (<i className="fa fa-user-circle-o fa-fw fa-3x" />)
  }

  renderMap (lat, lon) {
    if (lat === undefined || lon === undefined) {
      lat = '0'
      lon = '0'
    }

    const center = 'center=' + lat + ',' + lon
    const zoom = 'zoom=' + '15'
    const size = 'size=' + '2048x256'
    const mapType = 'maptype=' + 'roadmap'
    const marker = 'markers=' + 'color:red%7Clabel:S%7C' + lat + ',' + lon

    /*
    ** TO REMOVE !!
    */
    const key = 'key=AIzaSyDfj8okXWorzGLhJQPD8wS6Pri0HIyXPxE'
    /*
    ** TO REMOVE !!
    */

    const url = 'https://maps.googleapis.com/maps/api/staticmap'
    const query = center + '&' + zoom + '&' + size + '&' + mapType + '&' + marker + '&' + key
    const requestUrl = url + '?' + query

    const mapStyle = {
      'backgroundImage': 'url(' + requestUrl + ')'
    }

    return (<div className="embed-map" style={mapStyle} />)
  }

  renderAlert (message) {
    return (
      <div className="alert alert-danger" role="alert">
        { message }
      </div>
    )
  }

  renderHelpBlock (message) {
    return (<div className="help-block">{ message }</div>)
  }

  renderScore () {
    const { user } = this.props

    if (user && user.from) {
      const { score } = user.from

      return (
        <span className="user-info-score">
          { `(${score})`}
        </span>
      )
    }
    return (<i className="fa fa-spinner fa-pulse fa-fw fa-3x" />)
  }

  renderReportActionButton (self) {
    return (
      <span
        className="btn btn-default btn-block usr-profile-action-btn"
        onClick={() => this.handleReportModal('show')}
      >
        <i className="fa fa-flag" /><br />{' Report'}
      </span>
    )
  }

  renderBlockActionButton (self) {
    const username = this.state.informations.username
    const blockedTo = (self.blocked_to.indexOf(username) !== -1)

    if (!blockedTo)
    {
      return (
        <span className="btn btn-default btn-block usr-profile-action-btn"
          onClick={() => this.handleBlockAction()}
        >
          <i className="fa fa-unlock" /><br className="" />{' block'}
        </span>
      )
    } else {
      return (
        <span className="btn btn-default btn-block usr-profile-action-btn active"
          onClick={() => this.handleUnblockAction()}
        >
          <i className="fa fa-lock" /><br className="" />{' Unblock'}
        </span>
      )
    }
  }

  renderLikeActionButton (self) {
    const username = this.state.informations.username
    const blockedTo = (self.blocked_to.indexOf(username) !== -1)

    if (blockedTo)
      return (<div />)

    const errors = this.state.user.error

    const liked = (self.liked_to && self.liked_to.length) ? self.liked_to.indexOf(username) : -1
    const likeErrorIndex = (errors && errors.length) ? errors.findIndex(i => i.field === 'like') : -1
    const likeBtnState = (likeErrorIndex !== -1) ? 'btn-danger' : 'btn-default'

    if (liked === -1)
    {
      return (
        <span
          className={`btn btn-block usr-profile-action-btn ${likeBtnState}`}
          onClick={() => this.handleLikeAction()}
        >
          <i className="fa fa-heart-o" /><br className="" />{' Like'}
        </span>
      )
    } else {
      return (
        <span className="btn btn-default btn-block usr-profile-action-btn active"
          onClick={() => this.handleUnlikeAction()}
        >
          <i className="fa fa-heart" /><br className="" />{' Unlike'}
        </span>
      )
    }
  }

  renderChatActionButton (self) {
    const username = this.state.informations.username
    const blockedTo = (self.blocked_to.indexOf(username) !== -1)
    const matched = (self.matches.findIndex(i => i.username === username) !== -1)

    if (blockedTo)
      return (<div />)

    const disabled = (blockedTo || !matched) ? {disabled: true} : undefined

    return (
      <Link to={(disabled) ? `#` : `/messages/${username}`}>
        <span className={`btn btn-default btn-block usr-profile-action-btn`} {...disabled}>
          <i className="fa fa-comments-o" /><br className="" />{' Chat'}
        </span>
      </Link>
    )
  }

  renderActionsButtons () {
    const { self } = this.state.user
    const { username } = this.state.informations

    if (self && username !== self.username) {
      return (
        <div className="row">
          <div className="col-xs-6 col-sm-3 col-md-3">
            { this.renderLikeActionButton(self) }
            <div className="">
              <br />
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-3">
            { this.renderChatActionButton(self) }
            <div className="">
              <br />
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-3">
            { this.renderBlockActionButton(self) }
            <div className="">
              <br />
            </div>
          </div>
          <div className="col-xs-6 col-sm-3 col-md-3">
            { this.renderReportActionButton(self) }
            <div className="">
              <br />
            </div>
          </div>
        </div>
      )
    }
    return (<div />)
  }

  renderFromPageHeader () {
    const { state } = this
    const { from } = state.user

    if (from) {
      const { photos, score } = from
      const status = from.is_online ? { color: 'limegreen' } : { color: 'orangered' }
      const firstName = from.first_name
      const lastName = from.last_name

      const day = moment(from.last_connection_at)
      const now = moment()

      return (
        <div className="usr-profile-header">
          <div className="row">
            <div className="col-xs-12 text-center">
              <div className="usr-profile-photo">
                <ProfilePicture id="profilePicture" photos={photos} type="header" />
              </div>
              <div className="usr-profile-infos-score-wrapper">
                <strong>{ score }</strong>{' pts'}
                { from.is_online === false &&
                   <span><br />{'Last connection '}<strong>{ day.from(now) }</strong></span>
                }
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

  render () {
    const { state } = this
    const { from } = state.user

    const serverURL = 'http://localhost:4242/'

    return (
      <div className="col-md-10 col-md-offset-1">
        <Modal show={state.informations.report.showModal}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">{'Report user'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{'You will report this user to administrators, false reports will be punished. Report anyway ?'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => { this.handleReportModal('hide') }}>
              {'Close'}
            </Button>
            <Button bsStyle="danger" onClick={(e) => { this.handleReportAction() }}>
              {'Yes, report user'}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="">
          <div className="col-xs-12">
            { this.renderFromPageHeader() }
          </div>
        </div>
        <div className="">
          <div className="col-xs-12 text-center">
            { this.renderActionsButtons() }
          </div>
          <div className="col-xs-12">
            { from && from.photos && from.photos.length &&
              <div className="usr-profile-infos-block">
                <Carousel className="carousel">
                  { from.photos.map((photo, index) => {
                    const { photos } = from
                    const profilePhotoIndex = photos.findIndex(i => i.index === index)
                    const profilePhotoPath = (profilePhotoIndex !== -1) ? photos[profilePhotoIndex].path : ''
                    const profilePhotoCDN = (profilePhotoIndex !== -1 && photos[profilePhotoIndex].externalCDN) ? '' : serverURL
                    const profilePhotoStyle = { 'backgroundImage': 'url(' + profilePhotoCDN + profilePhotoPath + ')' }

                    return (
                      <Carousel.Item index={index} key={'carousel.item' + photo.index}>
                        <img alt="900x500" src={''} style={profilePhotoStyle} />
                      </Carousel.Item>
                    )
                  })}
                </Carousel>
              </div>
            }
          </div>
          <div className="col-xs-12" id="map-wrapper">
            { from && this.renderMap(from.position.lat, from.position.lon) }
          </div>
          <div className="col-xs-12">
            <div className="col-xs-12 usr-profile-infos-block">
              <h2>{'Informations'}</h2>
              <table className="table table-striped table-hover table-responsive">
                <tbody>
                  <tr>
                    <td className=""><strong>{'Orientation'}</strong></td>
                    <td className="">{ from && getOrientationAlias(from.orientation) }</td>
                  </tr>
                  <tr>
                    <td className=""><strong>{'Gender'}</strong></td>
                    <td className="">{ from && getGenderAlias(from.gender) }</td>
                  </tr>
                  <tr>
                    <td className=""><strong>{'Age'}</strong></td>
                    <td className="">{ from && from.age }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {from && from.interests && from.interests.length > 0 &&
              <div className="col-xs-12 usr-profile-infos-block">
                <h2>{'Interests'}</h2>
                <ul className="list-inline">
                  { from && from.interests.map(interest => {
                    return (<li className="usr-tag-wrapper" key={'interest.' + from.username + '.' + interest}>{'#'}<span className="usr-tag">{interest}</span></li>) })
                  }
                </ul>
              </div>
            }
            { from && from.bio && from.bio.length > 0 &&
              <div className="col-xs-12 usr-profile-infos-block">
                <h2>{'Description'}</h2>
                <p className="usr-description">
                  { from.bio }
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

ViewProfile.defaultProps = {
  authentication: {},
  user: {}
}

ViewProfile.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onBlockInteraction: PropTypes.func.isRequired,
  onLikeInteraction: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  onReportInteraction: PropTypes.func.isRequired,
  onUnblockInteraction: PropTypes.func.isRequired,
  onUnlikeInteraction: PropTypes.func.isRequired,
  requestProfileInfos: PropTypes.func.isRequired,
  triggerViewInteraction: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockInteraction: (history, informations) => {
      dispatch(userActions.blockInteraction(history, { username: informations.username }))
    },
    onLikeInteraction: (history, informations) => {
      dispatch(userActions.likeInteraction(history, { username: informations.username }))
    },
    triggerViewInteraction: (history, informations) => {
      dispatch(userActions.viewInteraction(history, { username: informations.username }))
    },
    onPageLoad: (history, informations) => {},
    onReportInteraction: (history, informations) => {
      dispatch(userActions.reportInteraction(history, { username: informations.username, type: informations.type }))
    },
    onUnblockInteraction: (history, informations) => {
      dispatch(userActions.unblockInteraction(history, { username: informations.username }))
    },
    onUnlikeInteraction: (history, informations) => {
      dispatch(userActions.unlikeInteraction(history, { username: informations.username }))
    },
    requestProfileInfos: (history, informations) => {
      dispatch(userActions.listInfosFrom(history, { username: informations.username }))
    }
  }
}

const connectedViewProfilePage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewProfile))
export { connectedViewProfilePage as ViewProfile }
