console.log = () => {}
console.error = () => {}
console.info = () => {}

// CSS dependancies

import FontAwesome from 'font-awesome-webpack'
import BootstrapSCSS from './node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import TypeaheadCSS from './node_modules/react-bootstrap-typeahead/css/Typeahead.css'
import RCSliderCSS from './node_modules/rc-slider/dist/rc-slider.min.css'
import AppCSS from './build/style.scss'

// React dependancies

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

// App dependancies

import { App } from './_components'

// App helpers

import { store } from './_helpers'

// Code

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} path="/" />
    </Router>
  </Provider>,
  document.getElementById('mount')
)
