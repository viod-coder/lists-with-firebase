import * as actionTypes from './listTypes'
import { auth, db } from '../../init-firebase'

// FETCH LISTS
export const fetchLists = () => {
  const { currentUser } = auth

  return (dispatch) => {
    db.ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({ type: actionTypes.FETCH_LISTS, payload: snapshot.val() })
      } else {
        dispatch({ type: actionTypes.FETCH_LISTS_FAIL })
      }
    })
  }
}

export const setCurrentList = (a) => {
  return { type: actionTypes.SET_CURRENT_LIST, payload: a }
}
export const noListsHere = () => {
  return { type: actionTypes.FETCH_LISTS_FAIL }
}
