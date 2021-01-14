import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import RootReducer from './reducers'

const middleware = [thunk]

export default createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware)) //...middleware
)
