import * as listTypes from '../actions/listTypes'

const initState = {
  currentList: '',
  lists: [],
  error: '',
}

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case listTypes.FETCH_LISTS_FAIL:
      return {
        ...state,
        currentList: '',
        lists: [],
        error: "No lists here. Let's create a new one !",
      }
    case listTypes.FETCH_LISTS:
      if (!state.currentList) {
        state.currentList = Object.keys(action.payload)[0]
      }
      return { ...state, lists: Object.keys(action.payload), error: '' }
    case listTypes.SET_CURRENT_LIST:
      return { ...state, currentList: action.payload }
    default:
      return state
  }
}

export default listReducer
