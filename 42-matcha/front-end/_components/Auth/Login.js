// React dependancies

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// App dependancies

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        username: '',
        password: '',
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
    const state = this.state
    state.authentication.error = undefined
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
    const { username, password } = state.informations
    const { history } = props

    state.informations.submitted = true
    this.setState(state)

    if (username && password) {
      const informations = {
        username: username,
        password: password
      }
      this.props.onLoginRequest(history, informations)
    }
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
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1><i className="fa fa-plug" />{' '}{ 'Sign-in' }</h1>
        </div>
        <form className="row" name="form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className={'form-group col-md-12'}>
            <label className="col-form-label" htmlFor="inputUsername4">{'Username'}</label>
            <input className="form-control" id="inputUsername4"
              name="username"
              onChange={(e) => { this.handleChange(e) }}
              placeholder="Captain Hook"
              required="True"
              type="text"
            />
          </div>
          <div className="form-row">
            <div className={'form-group col-md-12'}>
              <label className="col-form-label" htmlFor="inputPassword">{'Password'}</label>
              <input className="form-control" id="inputPassword"
                name="password"
                onChange={(e) => { this.handleChange(e) }}
                placeholder="Mr.Smee123"
                required="True"
                type="password"
              />
            </div>
          </div>
          <div className="form-group col-md-12">
            { errors && errors.length && this.renderAlert(errors[0].message) }
            <div className="btn-group">
              <button className="btn btn-default">{'Sign-in'}</button>
              <a className="btn btn-default btn-42"
                href="https://api.intra.42.fr/oauth/authorize?client_id=bba748d99ca261d9ac47036640f498a7a0c01c62a3cd6caba0a2769297150aa5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fsignin&response_type=code"
              >
                {'Sign-in with 42 API'}
              </a>
            </div>
            <Link className="custom-link" to="/forgot-password">{'Forgotten password ?'}</Link>
          </div>
        </form>
      </div>
    )
  }
}

Login.defaultProps = {
  authentication: {}
}

Login.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired,
  onLoginRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginRequest: (history, informations) => {
      dispatch(authActions.login(history, informations))
    }
  }
}

const connectedLoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
export { connectedLoginPage as Login }
