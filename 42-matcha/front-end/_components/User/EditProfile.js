// React dependancies

import React from 'react'
import { connect } from 'react-redux'

// App dependancies

import { userActions } from '../../_actions'
import ProfilePicture from './Sub/ProfilePicture.js'

// Middlewares

import PropTypes from 'prop-types'
import { Alert, Button, Modal } from 'react-bootstrap'
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead'

// Code

const AsyncTypeahead = asyncContainer(Typeahead)

class EditProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      informations: {
        fullName: 'Frag Trap',
        gender: '2',
        orientation: '2',
        age: '18',
        bio: 'This is my story...',
        position: { address: '4 bd of broken dreams, 75017 Paris, France' },
        location: {},
        interests: [],
        photos: '',
        currentModalPhotoIndex: -1,
        showModal: false,
        submitted: false
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
    const { self } = state.user

    if (self)
      this.updateForm(self)
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
    if (nextProps.user.self !== state.user.self)
    {
      this.updateForm(nextProps.user.self)
      state.user.self = nextProps.user.self
      hasChanged = true
    }
    if (nextProps.user.error !== state.user.error)
    {
      state.user.error = nextProps.user.error
      hasChanged = true
    }
    if (hasChanged)
      this.setState(state)
  }

  shouldComponentUpdate (nextProps, nextState) { return (true) }

  updateForm (self) {
    const { state } = this
    const infos = state.informations

    const firstName = (self.first_name) ? self.first_name : undefined
    const lastName = (self.last_name) ? self.last_name : undefined
    const position = (self.position) ? self.position : undefined

    state.informations.fullName = (firstName && lastName) ? firstName + ' ' + lastName : infos.fullName
    state.informations.gender = (self.gender) ? self.gender : infos.gender
    state.informations.orientation = (self.orientation) ? self.orientation : infos.orientation
    state.informations.age = (self.gender) ? self.age : infos.age
    state.informations.bio = (self.bio !== null) ? self.bio : infos.bio
    state.informations.interests = (self.interests !== null) ? self.interests : infos.interests

    state.informations.position.address = (position && position.address) ? position.address : infos.position.address
    state.informations.position = position

    state.informations.location.lat = (self.position.lat) ? self.position.lat : '0'
    state.informations.location.lon = (self.position.lon) ? self.position.lon : '0'

    this.setState(state)
  }

  handleChange (e) {
    const state = this.state
    const { name, value } = e.target

    if (name === 'address')
      state.informations.position.address = value
    else
      state.informations[name] = value
    this.setState(state)
  }

  handleSubmit (e) {
    e.preventDefault()

    const state = this.state
    const { fullName, gender, orientation, age, bio } = this.state.informations
    const address = this.state.informations.position.address

    const { history } = this.props

    state.user.error = undefined
    state.informations.submitted = true
    this.setState(state)

    if (fullName && gender && orientation && age && bio && address) {
      const informations = {
        fullName,
        gender,
        orientation,
        age,
        bio,
        address
      }
      this.props.onProfileUpdateRequest(history, informations)
    }
  }

  handleFileUpload (e) {
    const state = this.state
    const { name } = e.target

    if (e.target.files && e.target.files.length)
    {
      state.informations[name] = e.target.files[0]
      this.setState(state)
    }
  }

  handleFileSubmit (e) {
    e.preventDefault()

    const state = this.state
    const { photos } = this.state.informations
    const { history } = this.props

    state.informations.submitted = true
    state.user.error = undefined
    if (photos) {
      const informations = {
        photos
      }
      this.props.onProfilePhotosUpdateRequest(history, informations)
    }
  }

  handleGeolocation (e) {
    const { history } = this.props

    navigator.geolocation.getCurrentPosition((result) => {
      const informations = {
        lat: result.coords.latitude,
        lon: result.coords.longitude
      }
      this.props.onCoordsUpdateRequest(history, informations)
    })
  }

  handleProfileImageModal (action, index) {
    const { state, props } = this
    const { history } = props

    switch (action) {
      case ('show'):
        state.informations.currentModalPhotoIndex = index
        state.informations.showModal = true
        break
      case ('hide'):
        state.informations.showModal = false
        break
      case ('set'):
        state.informations.showModal = false
        this.props.onProfilePhotoUpdateRequest(history, {index: state.informations.currentModalPhotoIndex})
        break
    }
    this.setState(state)
  }

  handlePopAlertDismiss () {
    const { state } = this

    state.informations.submitted = false
    this.setState(state)
  }

  /*
  ** Typehead management - Begin
  */

  handleTypeaheadChange (selectedItems) {
    const { state } = this

    state.informations.interests = selectedItems
    this.setState(state)
  }

  handleTypeaheadSubmit (e) {
    e.preventDefault()

    const { state, props } = this
    const { history } = props

    const rawInterests = state.informations.interests
    const normalizedInterests = []

    if (rawInterests && rawInterests.length) {
      rawInterests.map((interest, index) => {
        if (interest.name)
          normalizedInterests.push(interest.name)
        else if (typeof interest === 'string')
          normalizedInterests.push(interest)
      })
    }
    if (normalizedInterests)
      this.props.onInterestsUpdateRequest(history, { interests: normalizedInterests })
  }

  handleTypeaheadSearch (query) {
    const { state } = this

    if (!query) return

    fetch(`http://localhost:4242/api/interests/list`)
      .then((resp) => resp.json())
      .then((json) => {
        state.items = json.content
        this.setState(state)
      })
  }

  renderTypeaheadMenuItemChildren (option, props, index) {
    return (
      <div key={option.id}>
        <span>{option.name}</span>
      </div>
    )
  }

  /*
  ** Typehead management - End
  */

  renderGrid () {
    const { self } = this.state.user
    const photos = (self) ? self.photos : undefined

    const serverURL = 'http://localhost:4242/'

    if (photos && photos.length) {
      const sortedPhotos = photos.sort((a, b) => {
        return (a.index - b.index)
      })

      return (
        <div className="col-xs-12 col-sm-12 col-md-8 img-grid text-left">
          { sortedPhotos && sortedPhotos.map((photo, index) => {
            if (sortedPhotos[index].index) {
              const photoCDN = (sortedPhotos[index].externalCDN) ? '' : serverURL

              return (
                <img
                  className="img-grid-tiny"
                  key={'grid-img.' + photo.index}
                  onClick={(e) => { this.handleProfileImageModal('show', sortedPhotos[index].index) }}
                  src={photoCDN + sortedPhotos[index].path}
                />
              )
            }
          })}
        </div>
      )
    }
    else
      return (<i className="fa fa-user-circle-o fa-fw fa-3x" />)
  }

  renderGoogleLocationMapPicture (lat, lon) {
    if (lat === undefined || lon === undefined) {
      lat = '0'
      lon = '0'
    }

    const center = 'center=' + lat + ',' + lon
    const zoom = 'zoom=' + '15'
    const size = 'size=' + '1024x256'
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

    return (<div className="hidden-xs embed-map" style={mapStyle} />)
  }

  renderPopAlert (message) {
    return (
      <div className="col-xs-12">
        <Alert bsStyle="success" onDismiss={() => { this.handlePopAlertDismiss() }}>
          <h4>{'Profile updated !'}</h4>
          <p>{'You can now enjoy to show your new informations'}</p>
        </Alert>
      </div>
    )
  }

  renderAlert (message) {
    return (
      <div className="alert alert-success" role="alert">
        { message }
      </div>
    )
  }

  renderHelpBlock (message) {
    return (<div className="help-block">{ message }</div>)
  }

  render () {
    const { state } = this
    const { informations, user } = state
    const { self } = user
    const photos = (self) ? self.photos : []

    const errors = state.user.error

    const fullNameError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'fullName') : -1
    const genderError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'gender') : -1
    const orientationError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'orientation') : -1
    const ageError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'age') : -1
    const bioError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'bio') : -1
    const locationError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'orientation') : -1
    const photosError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'photos') : -1

    return (
      <div className="col-md-8 col-md-offset-2">
        <Modal show={informations.showModal}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">{'Set as profile picture'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { self && informations.currentModalPhotoIndex !== -1 &&
              <ProfilePicture id="profilePicture" index={informations.currentModalPhotoIndex} photos={photos} type="profile-edition" /> }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => { this.handleProfileImageModal('hide', null) }}>
              {'Close'}
            </Button>
            <Button bsStyle="primary" onClick={(e) => { this.handleProfileImageModal('set', null) }}>
              {'Set profile picture'}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="">
          <div className="page-header col-md-12">
            <h1><i className="fa fa-pencil" />{' '}{ 'Edit profile'}</h1>
          </div>
        </div>
        { state.informations.submitted && !errors && this.renderPopAlert() }
        <div className="row">
          <div className="col-md-4 col-xs-12" id="profile-pictures-wrapper">
            <div className="col-xs-12 col-sm-6 col-md-12">
              <label className="col-form-label" htmlFor="profilePicture">
                {'Profile picture'}
              </label><br />
              <ProfilePicture id="profilePicture" photos={photos} type="profile-edition" /><br />
            </div>
            { this.renderGrid() }
            <div className="col-xs-12">
              <form name="form" onSubmit={(e) => { this.handleFileSubmit(e) }}>
                <div className="row">
                  <div className={'col-xs-12 text-left' + ((photosError !== -1) ? ' has-error' : '')} id="profile-file-input-wrapper">
                    <label className="col-form-label" htmlFor="profile-file-input">{'Photos'}</label>
                    <input id="profile-file-input" name="photos" onChange={(e) => this.handleFileUpload(e)} type="file" />
                    { photosError !== -1 &&
                      this.renderHelpBlock(errors[photosError].message) }
                    <button className="btn btn-default btn-block custom-btn" id="profile-file-submit-btn" style={{}} type="submit">
                      {'Upload new pictures'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xs-12">
              <form name="form" onSubmit={(e) => { this.handleTypeaheadSubmit(e) }}>
                <div className="row">
                  <div className="col-xs-12">
                    <br />
                    <label className="col-form-label" htmlFor="interests">
                      {'Interests'}
                    </label><br />
                    <AsyncTypeahead
                      allowNew
                      clearButton
                      id="interests"
                      labelKey="name"
                      multiple
                      onChange={(selectedItems) => { this.handleTypeaheadChange(selectedItems) }}
                      onSearch={(e) => { this.handleTypeaheadSearch(e) }}
                      options={state.items}
                      placeholder={'I am interested by...'}
                      renderMenuItemChildren={this.renderTypeaheadMenuItemChildren}
                      selected={state.informations.interests}
                    />
                    <button className="btn btn-default btn-block custom-btn" type="submit">{'Submit'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-8 col-xs-12" id="profile-form-wrapper">
            <form name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
              <div className={'form-group col-md-12' + ((fullNameError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputFullName">{'Name'}</label>
                <input className="form-control" id="inputFullName"
                  name="fullName"
                  onChange={(e) => { this.handleChange(e) }}
                  type="text"
                  value={informations.fullName}
                />
                { fullNameError !== -1 &&
                  this.renderHelpBlock(errors[fullNameError].message) }
              </div>
              <div className={'form-group col-md-12' + ((genderError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputGender">{'Gender'}</label>
                <select className="form-control" id="inputGender"
                  name="gender"
                  onChange={(e) => { this.handleChange(e) }}
                  value={informations.gender}
                >
                  <option value="0">{'Woman'}</option>
                  <option value="1">{'Man'}</option>
                  <option value="2">{'Not defined'}</option>
                </select>
                { genderError !== -1 &&
                  this.renderHelpBlock(errors[genderError].message) }
              </div>
              <div className={'form-group col-md-12' + ((orientationError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputOrientation">{'Orientation'}</label>
                <select className="form-control" id="inputOrientation"
                  name="orientation"
                  onChange={(e) => { this.handleChange(e) }}
                  value={informations.orientation}
                >
                  <option value="0">{'Heterosexual'}</option>
                  <option value="1">{'Gay'}</option>
                  <option value="2">{'Bisexual'}</option>
                </select>
                { orientationError !== -1 &&
                  this.renderHelpBlock(errors[orientationError].message) }
              </div>
              <div className={'form-group col-md-12' + ((ageError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputAge">{'Age'}</label>
                <input className="form-control" id="inputAge"
                  name="age"
                  onChange={(e) => { this.handleChange(e) }}
                  type="number"
                  value={informations.age}
                />
                { ageError !== -1 &&
                  this.renderHelpBlock(errors[ageError].message) }
              </div>
              <div className={'form-group col-md-12' + ((bioError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputBio">{'Bio'}</label>
                <textarea className="form-control" id="inputBio"
                  name="bio"
                  onChange={(e) => { this.handleChange(e) }}
                  rows="8"
                  value={informations.bio}
                />
                { bioError !== -1 &&
                  this.renderHelpBlock(errors[bioError].message) }
              </div>
              <div className={'form-group col-md-12' + ((locationError !== -1) ? ' has-error' : '')}>
                <label className="col-form-label" htmlFor="inputAddress">{'Location'}</label>
                <div className="input-group location-input">
                  <input className="form-control" id="inputAddress"
                    name="address"
                    onChange={(e) => { this.handleChange(e) }}
                    type="text"
                    value={informations.position.address}
                  />
                  <span className="input-group-addon btn btn-default" id="basic-addon2"
                    onClick={(e) => { this.handleGeolocation(e) }}
                  >
                    <i className="fa fa-location-arrow" />
                  </span>
                </div>
                { locationError !== -1 &&
                  this.renderHelpBlock(errors[locationError].message) }
                <div className="" id="map-wrapper">
                  { informations.position.address && this.renderGoogleLocationMapPicture(informations.location.lat, informations.location.lon) }
                </div>
              </div>
              <div className="col-xs-12 text-center">
                <button className="btn btn-default btn-block" type="submit">{'Update profile'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.defaultProps = {
  authentication: {},
  user: {}
}

EditProfile.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onCoordsUpdateRequest: PropTypes.func.isRequired,
  onInterestsUpdateRequest: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  onProfilePhotoUpdateRequest: PropTypes.func.isRequired,
  onProfilePhotosUpdateRequest: PropTypes.func.isRequired,
  onProfileUpdateRequest: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCoordsUpdateRequest: (history, informations) => {
      dispatch(userActions.updateCoords(history, informations))
    },
    onInterestsUpdateRequest: (history, informations) => {
      dispatch(userActions.updateInterests(history, informations))
    },
    onPageLoad: (history, informations) => {},
    onProfilePhotoUpdateRequest: (history, informations) => {
      dispatch(userActions.updateProfilePhoto(history, informations))
    },
    onProfilePhotosUpdateRequest: (history, informations) => {
      dispatch(userActions.updatePhotos(history, informations))
    },
    onProfileUpdateRequest: (history, informations) => {
      dispatch(userActions.updateProfile(history, informations))
    }
  }
}

const connectedEditProfilePage = connect(mapStateToProps, mapDispatchToProps)(EditProfile)
export { connectedEditProfilePage as EditProfile }
