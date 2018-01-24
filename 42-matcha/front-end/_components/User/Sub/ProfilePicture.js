// React dependancies

import React from 'react'

// Middlewares

import PropTypes from 'prop-types'

// Code

export default class ProfilePicture extends React.Component
{
  constructor (props) {
    super(props)

    this.state = {
      index: this.props.index,
      photos: this.props.photos,
      type: this.props.type
    }
  }

  componentWillReceiveProps (nextProps) {
    const { state } = this

    if (nextProps.photos !== state.photos) {
      state.photos = nextProps.photos
      this.setState(state)
    }
  }

  shouldComponentUpdate (nextProps) {
    return (true)
  }

  render () {
    const { index, photos, type } = this.state
    const serverURL = 'http://localhost:4242/'

    if (type === 'notification-blocked')
      return (<div className="img-rounded img-custom hidden-xs text-center"><span className="fa fa-lock fa-3x" /></div>)
    else if (photos.length) {
      const profilePhotoIndex = photos.findIndex(i => i.index === index)
      const profilePhotoPath = (profilePhotoIndex !== -1) ? photos[profilePhotoIndex].path : ''
      const profilePhotoCDN = (profilePhotoIndex !== -1 && photos[profilePhotoIndex].externalCDN) ? '' : serverURL
      const profilePhotoStyle = { 'backgroundImage': 'url(' + profilePhotoCDN + profilePhotoPath + ')' }

      if (profilePhotoIndex === -1)
        return (<div className="navbar-left img-custom-tiny"><i className="fa fa-spinner fa-pulse fa-fw" /></div>)

      switch (type) {
        case ('navbar'):
          return (<div className="navbar-left img-custom-navbar"><img src={profilePhotoCDN + profilePhotoPath} /></div>)
        case ('header'):
          return (<img className="img-responsive" style={profilePhotoStyle} />)
        case ('notification'):
          return (<div className="img-rounded img-custom hidden-xs" style={profilePhotoStyle} />)
        case ('profile-edition'):
          return (<div className="img-custom-preview"><img src={profilePhotoCDN + profilePhotoPath} /></div>)
        case ('grid-thumbnail'):
          return (<img alt={'...'} src={`${profilePhotoCDN}${profilePhotoPath}`} />)
        default:
          break
      }
    }
    return (<i className="fa fa-user-circle-o fa-fw" />)
  }
}

ProfilePicture.defaultProps = {
  index: 0,
  photos: [],
  type: ''
}

ProfilePicture.propTypes = {
  index: PropTypes.number,
  photos: PropTypes.array,
  type: PropTypes.string
}
