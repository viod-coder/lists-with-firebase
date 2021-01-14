import { combineReducers } from 'redux'
import authReducers from './authReducers'
import itemReducer from './itemReducers'

export default combineReducers({
  authState: authReducers,
  itemState: itemReducer,
})
