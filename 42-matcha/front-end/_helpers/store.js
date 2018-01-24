import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

import reducers from '../_reducers'

// const loggerMiddleware = createLogger()

export const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
)
