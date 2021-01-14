import {
  START_CREATING_ITEM,
  CREATE_ITEM,
  ERROR_CREATE_ITEM,
  FETCH_ITEMS_SUCCES,
  FETCH_ITEMS_FAIL,
  NO_CONNECTION,
  SET_UNWRITING,
  CHANGE_STATUS,
  EDIT_ITEM,
  ITEM_EXISTS,
} from '../actions/itemTypes'

const initState = {
  items: [],
  error: '',
  writing: false,
}

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case START_CREATING_ITEM:
      return { ...state, writing: true, error: '' }
    case SET_UNWRITING:
      return { ...state, writing: false }
    case CREATE_ITEM:
      return {
        ...state,
        writing: false,
      }
    case ITEM_EXISTS:
      return { ...state, error: `${action.payload} este deja in lista` }
    case ERROR_CREATE_ITEM:
      return { ...state, error: action.payload, writing: false }

    case FETCH_ITEMS_SUCCES:
      let newArray = Object.keys(action.payload).map((el) => {
        return { ...action.payload[el], itemkey: el }
      })

      newArray.sort((a, b) => {
        // if (a.item > b.item) {
        //   return 1
        // }
        // if (a.item < b.item) {
        //   return -1
        // }
        // return 0
        return b.timestamp - a.timestamp
      })

      return { ...state, items: newArray, writing: false }

    case FETCH_ITEMS_FAIL:
      return initState

    case NO_CONNECTION:
      console.log('no connection')
      return state

    case CHANGE_STATUS:
      return state

    case EDIT_ITEM:
      return state

    default:
      return { ...state }
  }
}

export default itemReducer
