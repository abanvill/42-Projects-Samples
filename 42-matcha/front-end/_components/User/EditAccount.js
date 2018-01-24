import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { userActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class EditAccount extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        email: '',
        password: '',
        passwordConfirmation: '',
        submitted: false
      },
      authentication: { ...props.authentication },
      user: { ...props.user }
    }
  }

  componentWillMount () {
    const { state } = this
    const { history } = this.props

    state.user.error = undefined
    if (!state.authentication.user.status.isSigned)
      this.props.history.push('/signin')
    if (!state.user.self) {
      this.props.onEmptyUser(history, {})
    }
    this.props.onPageLoad(history, {})
  }

  componentWillReceiveProps (nextProps) {
    const state = this.state
    var hasChanged = false

    if (nextProps.authentication !== state.authentication) {
      state.authentication = nextProps.authentication
      hasChanged = true
    }
    if (nextProps.user !== state.user) {
      state.user = nextProps.user
      hasChanged = true
    }

    if (hasChanged)
      this.setState(state)
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
    const { email, password, passwordConfirmation } = this.state.informations
    const { history } = this.props

    state.user.error = undefined
    state.informations.submitted = true
    state.user.passwordUpdated = false
    this.setState(state)

    if (password && passwordConfirmation) {
      const informations = {
        password,
        confirmation: passwordConfirmation
      }
      this.props.onPasswordUpdate(history, informations)
    }
    else if (email) {
      const informations = {
        email
      }
      this.props.onEmailUpdate(history, informations)
    }
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
    const errors = this.state.user.error

    const emailError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'email') : -1
    const passwordError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'password') : -1
    const passwordConfirmationError = (errors && errors.length)
      ? errors.findIndex(i => i.field === 'passwordConfirmation') : -1

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-key" />{' '}{ 'Change password'}</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="form-row">
            <div className={'form-group col-md-6' + ((passwordError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputPassword">{'New password'}</label>
              <input className="form-control" id="inputPassword"
                name="password"
                onChange={(e) => { this.handleChange(e) }}
                required="True"
                type="password"
              />
              { passwordError !== -1 &&
                this.renderHelpBlock(errors[passwordError].message) }
            </div>
            <div className={'form-group col-md-6' + ((passwordError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputPasswordConfirmation">{'Confirm new password'}</label>
              <input className="form-control" id="inputPasswordConfirmation"
                name="passwordConfirmation"
                onChange={(e) => { this.handleChange(e) }}
                required="True"
                type="password"
              />
              { passwordConfirmationError !== -1 &&
                this.renderHelpBlock(errors[passwordConfirmationError].message) }
            </div>
            <div className="form-group col-md-12">
              { this.state.user.passwordUpdated && this.renderAlert('Password successfully updated')}
              <button className="btn btn-default">{'Update password'}</button><br />
            </div>
          </div>
        </form>

        <div className="page-header col-md-12">
          <h1><i className="fa fa-envelope-o" />{' '}{ 'Change email'}</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="form-row">
            <div className="form-group">
              <label className="col-sm-2 control-label">{'Current'}</label>
              <div className="col-sm-10">
                <p className="form-control-static">
                  {this.state.user.self ? this.state.user.self.email : ''}
                </p>
              </div>
            </div>
            <div className={'form-group col-md-12' + ((emailError !== -1) ? ' has-error' : '')}>
              <label className="col-form-label" htmlFor="inputEmail">{'Email'}</label>
              <input className="form-control" id="inputEmail"
                name="email"
                onChange={(e) => { this.handleChange(e) }}
                required="True"
                type="email"
              />
              { emailError !== -1 &&
                this.renderHelpBlock(errors[emailError].message) }
            </div>
            <p className="col-md-12 text-danger">
              {'A confirmation link will not be sended, make sure that the mail is valid before changing it'}
            </p>
            <div className="form-group col-md-12">
              { this.state.user.emailUpdated && this.renderAlert('Email successfully updated')}
              <button className="btn btn-default">{'Change email'}</button><br />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

EditAccount.defaultProps = {
  authentication: {},
  user: {}
}

EditAccount.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onEmailUpdate: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  const { authentication, user } = state
  return ({ authentication, user })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailUpdate: (history, informations) => {
      dispatch(userActions.updateEmail(history, { email: informations.email }))
    },
    onEmptyUser: (history, informations) => {
      dispatch(userActions.listInfos(history, {}))
    },
    onPageLoad: (history, informations) => {
      // dispatch(userActions.listInfos(history, {}))
    },
    onPasswordUpdate: (history, informations) => {
      dispatch(userActions.updatePassword(history, { password: informations.password, password_confirmation: informations.confirmation }))
    }
  }
}

const connectedEditAccountPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAccount))
export { connectedEditAccountPage as EditAccount }
