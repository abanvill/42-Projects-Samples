import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { authActions } from '../../_actions'

// Middlewares

import PropTypes from 'prop-types'

// Code

class ActivateAccount extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      informations: {
        submitted: false
      },
      authentication: { ...props.authentication }
    }
    this.state.authentication.error = undefined

    if (props.authentication.user.status.isSigned)
      return (props.history.push('/'))

    const { account, token } = props.match.params
    const { dispatch, history } = props

    if (account && token) {
      const informations = {
        account: account,
        token: token
      }
      dispatch(authActions.activateAccount(history, informations))
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

    const { loggingIn, signedIn } = this.state.authentication.user.status
    const { submitted } = this.state.informations
    const errors = this.state.authentication.error

    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1>{'Activate'}</h1>
        </div>
        <div className="form-group col-md-12">
          { errors && errors.length && this.renderAlert(errors[0].message) }
          <Link to="/signin">{'Login'}</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { authentication } = state
  return ({ authentication })
}

const connectedActivateAccountPage = withRouter(connect(mapStateToProps)(ActivateAccount))
export { connectedActivateAccountPage as ActivateAccount }
