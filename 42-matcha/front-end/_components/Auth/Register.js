// React dependancies

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// App dependancies

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        email: '',
        username: '',
        fullName: '',
        password: '',
        passwordConfirmation: '',
        submitted: false
      },
      authentication: { ...props.authentication }
    }
  }

  componentWillMount () {
    const { state } = this

    state.authentication.error = undefined
    if (state.authentication.user.status.isSigned)
      this.props.history.push('/home')
  }

  componentWillReceiveProps (nextProps) {
    const { state } = this

    if (nextProps.authentication !== state.authentication) {
      if (nextProps.authentication && nextProps.authentication.registered)
        this.props.history.push('/signup/activate')
      state.authentication = nextProps.authentication
      this.setState(state)
    }
  }

  shouldComponentUpdate () { return (true) }

  handleChange (e) {
    const state = this.state
    const { name, value } = e.target

    state.informations[name] = value
    this.setState(state)
  }

  handleSubmit (e) {
    e.preventDefault()

    const { state, props } = this
    const { email, username, fullName, password, passwordConfirmation } = state.informations
    const { history } = props

    state.informations.submitted = true
    this.setState(state)

    if (email && username && fullName && password && passwordConfirmation)
    {
      const informations = {
        email,
        username,
        fullName,
        password,
        passwordConfirmation
      }
      this.props.onRegisterRequest(history, informations)
    }
  }

  renderHelpBlock (message) {
    return (<div className="help-block">{ message }</div>)
  }

  render () {
    const errors = this.state.authentication.error

    const emailError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'email') : -1
    const usernameError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'username') : -1
    const fullNameError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'fullName') : -1
    const passwordError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'password') : -1
    const passwordConfirmationError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'passwordConfirmation') : -1

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-user-plus" />{' '}{'Sign-up'}</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className={'form-group col-md-12' + ((emailError !== -1) ? ' has-error' : '')}>
            <label className="col-form-label" htmlFor="inputEmail4">{'Email'}</label>
            <input className="form-control" id="inputEmail4"
              name="email"
              onChange={(e) => { this.handleChange(e) }}
              placeholder="Hook-cptn@pirates.iw"
              required="True"
              type="email"
            />
            { emailError !== -1 &&
              this.renderHelpBlock(errors[emailError].message) }
          </div>
          <div className={'form-group col-md-12' + ((usernameError !== -1) ? ' has-error' : '')}>
            <label className="col-form-label" htmlFor="inputUsername4">{'Username'}</label>
            <input className="form-control" id="inputUsername4"
              name="username"
              onChange={(e) => { this.handleChange(e) }}
              placeholder="Hook"
              required="True"
              type="text"
            />
            { usernameError !== -1 &&
              this.renderHelpBlock(errors[usernameError].message) }
          </div>
          <div className={'form-group col-md-12' + ((fullNameError !== -1) ? ' has-error' : '')}>
            <label className="col-form-label" htmlFor="inputFullName">{'Full name'}</label>
            <input className="form-control" id="inputFullName"
              name="fullName"
              onChange={(e) => { this.handleChange(e) }}
              placeholder="Cptn. James Hook"
              required="True"
              type="text"
            />
            { fullNameError !== -1 &&
              this.renderHelpBlock(errors[fullNameError].message) }
          </div>
          <div className="form-row">
            <div className={'form-group col-md-6' + ((passwordError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputPassword">{'Password'}</label>
              <input className="form-control" id="inputPassword"
                name="password"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="IHatePeterPan99"
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
                placeholder="IHatePeterPan99"
                required="True"
                type="password"
              />
              { passwordConfirmationError !== -1 &&
                this.renderHelpBlock(errors[passwordConfirmationError].message) }
            </div>
          </div>
          <div className="form-group col-md-12">
            <button className="btn btn-default">{'Register'}</button><br />
          </div>
        </form>
      </div>
    )
  }
}

Register.defaultProps = {
  authentication: {}
}

Register.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onRegisterRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterRequest: (history, informations) => {
      dispatch(authActions.register(history, informations))
    }
  }
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(Register)
export { connectedRegisterPage as Register }
