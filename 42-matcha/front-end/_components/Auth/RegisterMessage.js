// React dependancies

import React from 'react'
import { connect } from 'react-redux'

// Middlewares

import PropTypes from 'prop-types'

// Code

class RegisterMessage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      authentication: { ...props.authentication }
    }
  }

  componentWillMount () {
    const { state } = this

    if (state.authentication.user.status.isSigned)
      this.props.history.push('/home')
    if (!state.authentication.registered)
      this.props.history.push('/signup')
  }

  shouldComponentUpdate () { return (true) }

  render () {
    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="page-header col-md-12">
          <h1>{'You\'re pretty near'}</h1>
        </div>
        <div className="col-md-12">
          <div className="panel panel-success">
            <div className="panel-body">
              {'A mail has been sended to the email you has provided, to activate your account, please check your mail box.'}
            </div>
            <div className="panel-footer">
              <small>
                {'If you don\'t find it, please make sure to check your spam folder'}
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RegisterMessage.defaultProps = {
  authentication: {}
}

RegisterMessage.propTypes = {
  authentication: PropTypes.object,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { authentication } = state
  return ({ authentication })
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
const connectedRegisterMessagePage = connect(mapStateToProps, mapDispatchToProps)(RegisterMessage)
export { connectedRegisterMessagePage as RegisterMessage }
