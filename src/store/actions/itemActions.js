import * as actionTypes from './itemTypes'
import { auth, db } from '../../init-firebase'
import firebase from 'firebase'

//WRITING
const setWriting = () => {
  return { type: actionTypes.START_CREATING_ITEM }
}
const setUnWriting = () => {
  return { type: actionTypes.SET_UNWRITING }
}

// ITEM EXISTS
export const itemExists = (err) => {
  return { type: actionTypes.ITEM_EXISTS, payload: err }
}

// CREATE ITEMS ACTIONS

const createItemAction = () => {
  return {
    type: actionTypes.CREATE_ITEM,
  }
}

export const createItem = (paramItem) => {
  const { item, category } = paramItem
  // console.log(item, category)
  const { currentUser } = auth
  return (dispatch) => {
    dispatch(setWriting())
    db.ref(`/users/${currentUser.uid}/items`)
      .push({
        item,
        category,
        complete: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP, //firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // console.log('am intrat la then')
        dispatch(createItemAction())
      })
      .catch((err) => {
        // console.log('am intrat la eroare')
        dispatch({ type: actionTypes.ERROR_CREATE_ITEM, payload: err })
      })
  }
}

const fetchAction = (snapshot) => {
  return { type: actionTypes.FETCH_ITEMS_SUCCES, payload: snapshot.val() }
}
export const fetchItems = () => {
  const { currentUser } = auth
  return (dispatch) => {
    dispatch({ type: actionTypes.START_CREATING_ITEM })
    db.ref(`/users/${currentUser.uid}/items`)
      // .orderByChild('item')
      // .on('value', (snapshot) => {

      //   snapshot.forEach((childSnapshot) => {
      //     console.log('key=', childSnapshot.key)
      //     console.log('val=', childSnapshot.val())
      //   })
      // })
      // console.log('itm', itm)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          dispatch(fetchAction(snapshot))
          // console.log(snapshot.val())
          // const aaa = db.collection(`users`)
          // console.log('res.data=', aaa)
        } else {
          dispatch({
            type: actionTypes.FETCH_ITEMS_FAIL,
          })
        }
      })
  }
}
const deleteAction = (item) => {
  return { type: actionTypes.DELETE_ITEM, payload: item }
}

export const deleteItem = (itemkey) => {
  const { currentUser } = auth
  // console.log('din delete items')
  return (dispatch) => {
    dispatch(setWriting())
    db.ref(`/users/${currentUser.uid}/items/${itemkey}`)
      .remove()
      .then(dispatch(setUnWriting()))
  }
}

export const checkConnection = () => {
  return (dispatch) => {
    db.ref('.info/connected').on('value', (snap) => {
      if (snap.val() === false) {
        dispatch({ type: actionTypes.NO_CONNECTION })
        return
      }
    })
  }
}

//change COMPLETE STATUS

export const changeComplete = (crtItem) => {
  const { currentUser } = auth
  return (dispatch) => {
    db.ref(`/users/${currentUser.uid}/items/${crtItem.itemkey}`).update({
      complete: !crtItem.complete,
    })
    dispatch({ type: actionTypes.CHANGE_STATUS, payload: crtItem })
  }
}

// edit item

export const editItem = (crtItem) => {
  const { currentUser } = auth
  return (dispatch) => {
    db.ref(`/users/${currentUser.uid}/items/${crtItem.itemID}`).update({
      category: crtItem.category,
      item: crtItem.item,
    })
    dispatch({ type: actionTypes.EDIT_ITEM, payload: crtItem })
  }
}
