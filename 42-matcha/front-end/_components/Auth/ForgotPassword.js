// React dependancies

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class ForgotPassword extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        email: '',
        submitted: false
      },
      authentication: { ...props.authentication }
    }
  }

  componentWillMount () {
    const { state } = this

    if (state.authentication.user.status.isSigned)
      this.props.history.push('/home')
  }

  componentWillReceiveProps (nextProps) {
    const { state } = this

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

  handleSubmit (e) {
    e.preventDefault()

    const { state, props } = this
    const { email } = state.informations
    const { history } = props

    state.informations.submitted = true
    this.setState(state)

    if (email) {
      const informations = {
        email: email
      }
      this.props.onPasswordRequest(history, informations)
    }
  }

  renderAlert (message) {
    return (
      <div className="alert alert-info" role="alert">
        { message }
      </div>
    )
  }

  renderHelpBlock (message) {
    return (<div className="help-block">{ message }</div>)
  }

  render () {
    const { submitted } = this.state.informations

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-question-circle" />{' '}{'Password forgotten'}</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className={'form-group col-md-12'}>
            <label className="col-form-label" htmlFor="inputUsername4">{'Email'}</label>
            <input className="form-control" id="inputUsername4"
              name="email"
              onChange={(e) => { this.handleChange(e) }}
              placeholder="Hook-cptn@pirates.iw"
              required="True"
              type="email"
            />
          </div>
          <div className="form-group col-md-12">
            { submitted && this.renderAlert('A mail has been submitted to this account, if it exists please check your scams folder.') }
            <button className="btn btn-default">{'Send email'}</button>
            <Link className="custom-link" to="/signin">{'or Return to sign-in page'}</Link>
          </div>
        </form>
      </div>
    )
  }
}

ForgotPassword.defaultProps = {
  authentication: {}
}

ForgotPassword.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onPasswordRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPasswordRequest: (history, informations) => {
      dispatch(authActions.forgotPassword(history, informations))
    }
  }
}

const connectedForgotPasswordPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))
export { connectedForgotPasswordPage as ForgotPassword }
