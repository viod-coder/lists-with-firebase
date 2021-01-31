import { combineReducers } from 'redux'
import authReducers from './authReducers'
import itemReducer from './itemReducers'
import listReducer from './listReducer'

export default combineReducers({
  authState: authReducers,
  itemState: itemReducer,
  listState: listReducer,
})
