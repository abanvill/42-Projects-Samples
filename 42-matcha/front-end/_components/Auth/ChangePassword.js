// React dependancies

import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class ChangePassword extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        account: '',
        token: '',
        password: '',
        passwordConfirmation: '',
        submitted: false
      },
      authentication: { ...props.authentication }
    }
  }

  componentWillMount () {
    const { state } = this

    if (this.props.authentication.user.status.isSigned)
      this.props.history.push('/home')
    else {
      const { account, token } = this.props.match.params

      if (!account || !token)
        this.props.history.push('/forgot-password')

      state.informations.account = account
      state.informations.token = token
    }
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

  handleSubmit (e) {
    e.preventDefault()

    const state = this.state
    const { account, token, password, passwordConfirmation } = this.state.informations
    const { history } = this.props

    state.informations.submitted = true
    this.setState(state)

    if (account && token && password && passwordConfirmation) {
      const informations = {
        account,
        token,
        password,
        password_confirmation: passwordConfirmation
      }
      this.props.onPasswordRequest(history, informations)
    }
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

  render () {
    const errors = this.state.authentication.error

    const passwordError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'password') : -1
    const passwordConfirmationError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'passwordConfirmation') : -1

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1>{'Change password'}</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="form-row">
            <div className={'form-group col-md-6' + ((passwordError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputPassword">{'Password'}</label>
              <input className="form-control" id="inputPassword"
                name="password"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="Password"
                required="True"
                type="password"
              />
              { passwordError !== -1 &&
                this.renderHelpBlock(errors[passwordError].message) }
            </div>
            <div className={'form-group col-md-6' + ((passwordConfirmationError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputPasswordConfirmation">{'Password confirmation'}</label>
              <input className="form-control" id="inputPasswordConfirmation"
                name="passwordConfirmation"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="Password confirmation"
                required="True"
                type="password"
              />
              { passwordConfirmationError !== -1 &&
                this.renderHelpBlock(errors[passwordConfirmationError].message) }
            </div>
            <div className="form-group col-md-12">
              { errors && errors.length && this.renderAlert(errors[0].message) }
              <button className="btn btn-primary">{'Submit'}</button><br />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

ChangePassword.defaultProps = {
  authentication: {}
}

ChangePassword.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onPasswordRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPasswordRequest: (history, informations) => {
      dispatch(authActions.changePassword(history, informations))
    }
  }
}

const connectedChangePasswordPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))
export { connectedChangePasswordPage as ChangePassword }
