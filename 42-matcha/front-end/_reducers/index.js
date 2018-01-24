import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { authentication } from './authentication'
import { user } from './user'

const reducers = combineReducers({
  authentication,
  user,
  routing: routerReducer
})

export default reducers
