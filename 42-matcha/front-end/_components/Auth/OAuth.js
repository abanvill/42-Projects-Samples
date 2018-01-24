// React dependancies

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// App dependancies

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class OAuth extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        submitted: false
      },
      authentication: { ...props.authentication }
    }
  }

  componentWillMount () {
    const { state } = this
    const { history, match } = this.props

    state.authentication.error = undefined
    if (state.authentication.user.status.isSigned)
      this.props.history.push('/home')
    this.props.onOAuthRequest(history, { code: match.params.code })
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      this.setState(state)
    }
  }

  shouldComponentUpdate (nextProps, nextState) { return (true) }

  handleChange (e) {
    const state = this.state
    const { name, value } = e.target

    state.informations[name] = value
    this.setState(state)
  }

  renderAlert (message) {
    return (
      <div className="alert alert-danger alert-dismissible" role="alert">
        {message}
      </div>
    )
  }

  renderHelpBlock (message) {
    return (<div className="help-block">{ message }</div>)
  }

  render () {
    const errors = this.state.authentication.error

    return (
      <div className="col-md-10 col-md-offset-1">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-spinner fa-pulse" />{'   ' + 'Talking with API please wait...'}</h1>
        </div>
      </div>
    )
  }
}

OAuth.defaultProps = {
  authentication: {}
}

OAuth.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onOAuthRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOAuthRequest: (history, informations) => {
      dispatch(authActions.oauthLogin(history, informations))
    }
  }
}

const connectedOAuthPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(OAuth))
export { connectedOAuthPage as OAuth }
