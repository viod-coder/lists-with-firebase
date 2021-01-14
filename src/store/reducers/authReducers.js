import {
  LOADING,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_SUCCES,
  SIGNUP_FAIL,
  MODAL_CLOSE,
  CLEAN_ERROR,
  RE_LOGIN_USER,
} from '../actions/types'

const initState = {
  email: '',
  name: '',
  error: '',
  uid: '',
  loading: false,
}
const authReducers = (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, ...initState, loading: true }

    case LOGIN_SUCCES:
      // console.log(action.payload.user)
      return {
        ...state,
        email: action.payload.user.email,
        name: action.payload.user.displayName,
        uid: action.payload.user.uid,
        loading: false,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        ...initState,
        loading: false,
        error: action.payload.message,
      }

    case LOGOUT:
      return initState

    case SIGNUP_SUCCES:
      // console.log(action.payload)
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.displayName,
        uid: action.payload.uid,
        loading: false,
      }

    case SIGNUP_FAIL:
      return {
        ...state,
        ...initState,
        loading: false,
        error: action.payload.message,
      }

    case MODAL_CLOSE:
      var elem = document.querySelector(action.payload) //'#modal1'
      var instance = window.M.Modal.getInstance(elem)
      instance.close()
      return { ...state }

    case CLEAN_ERROR:
      return { ...state, error: '' }

    case RE_LOGIN_USER:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.displayName,
        uid: action.payload.uid,
        loading: false,
      }

    default:
      return { ...state }
  }
}

export default authReducers
