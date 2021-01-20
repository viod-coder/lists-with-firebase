import * as actionTypes from './itemTypes'
import * as listTypes from './listTypes'
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

// const createItemAction = () => {
//   return {
//     type: actionTypes.CREATE_ITEM,
//   }
// }

export const createItem = (paramItem) => {
  const { item, category, lista } = paramItem
  // console.log(item, category)
  const { currentUser } = auth
  return (dispatch) => {
    dispatch(setWriting())
    db.ref(`/users/${currentUser.uid}/${lista}`)
      .push({
        item,
        category,
        complete: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP, //firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // console.log('am intrat la then')
        dispatch({
          type: actionTypes.CREATE_ITEM,
        })
        dispatch({ type: listTypes.SET_CURRENT_LIST, payload: lista })
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
export const fetchItems = (myList) => {
  const { currentUser } = auth
  return (dispatch) => {
    // dispatch({ type: actionTypes.START_CREATING_ITEM })
    db.ref(`/users/${currentUser.uid}/${myList}`).on('value', (snapshot) => {
      if (snapshot.val()) {
        dispatch({
          type: actionTypes.FETCH_ITEMS_SUCCES,
          payload: snapshot.val(),
        })
      } else {
        db.ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
          if (snapshot.val()) {
            dispatch({ type: listTypes.FETCH_LISTS, payload: snapshot.val() })
          } else {
            dispatch({ type: listTypes.FETCH_LISTS_FAIL })
          }
        })

        dispatch({
          type: listTypes.FETCH_LISTS_FAIL,
        })
      }
    })
  }
}

// DELETE ITEM
export const deleteItem = (item) => {
  console.log('item', item)
  const { currentUser } = auth
  return (dispatch) => {
    dispatch(setWriting())
    db.ref(`/users/${currentUser.uid}/${item.lista}/${item.itemkey}`)
      .remove()
      .then(dispatch(setUnWriting()))
  }
}

// export const checkConnection = () => {
//   return (dispatch) => {
//     db.ref('.info/connected').on('value', (snap) => {
//       if (snap.val() === false) {
//         dispatch({ type: actionTypes.NO_CONNECTION })
//         return
//       }
//     })
//   }
// }

//change COMPLETE STATUS

export const changeComplete = (crtItem) => {
  const { currentUser } = auth
  return (dispatch) => {
    db.ref(
      `/users/${currentUser.uid}/${crtItem.lista}/${crtItem.itemkey}`
    ).update({
      complete: !crtItem.complete,
    })
    dispatch({ type: actionTypes.CHANGE_STATUS, payload: crtItem })
  }
}

// EDIT ITEM

export const editItem = (crtItem) => {
  const { currentUser } = auth
  const { item, category, lista, itemkey } = crtItem
  return (dispatch) => {
    db.ref(`/users/${currentUser.uid}/${lista}/${itemkey}`).update({
      category: category,
      item: item,
    })
    dispatch({ type: actionTypes.EDIT_ITEM, payload: crtItem })
  }
}

export const restoreItemState = () => {
  return { type: actionTypes.RESTORE_INITIAL }
}
