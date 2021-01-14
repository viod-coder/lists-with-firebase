import * as actionTypes from './types'
import { auth, db } from '../../init-firebase'

const setLoading = () => {
  return { type: actionTypes.LOADING }
}

export const modalClose = (modalName) => {
  return { type: actionTypes.MODAL_CLOSE, payload: modalName }
}

// LOGIN ACTIONS

const loginSucces = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCES,
    payload: user,
  }
}

const loginFail = (err) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: err,
  }
}

export const userLogin = (email, password, history, modal) => {
  return (dispatch) => {
    dispatch(setLoading())
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch(modalClose(modal))
        dispatch(loginSucces(res))
        history.push('/')
      })
      .catch((err) => {
        dispatch(loginFail(err))
      })
  }
}
//LOG OUT ACTION
export const logout = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(function () {
        console.log('Sign-out successful.')
        dispatch({ type: actionTypes.LOGOUT })
      })
      .catch(function (error) {
        // An error happened.
      })
  }
}
// SIGNUP ACTIONS

const signupSucces = (user) => {
  return {
    type: actionTypes.SIGNUP_SUCCES,
    payload: user,
  }
}

const signupFail = (err) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    payload: err,
  }
}

export const userSignup = (email, password, fName, lName, history, modal) => {
  return (dispatch) => {
    const fullName = fName + ' ' + lName
    dispatch(setLoading())
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // const myUser = auth.currentUser
        // console.log('myuser', myUser)
        // return myUser
        auth.currentUser
          .updateProfile({
            displayName: fullName,
          })
          .then(() => {
            const myUser = auth.currentUser
            // console.log('xxx', myUser)
            dispatch(modalClose(modal))
            dispatch(signupSucces(myUser))
            history.push('/')
          })
      })

      .catch((err) => {
        dispatch(signupFail(err))
      })
  }
}

// CLEAN ERROR

export const errorCleaning = () => {
  return { type: actionTypes.CLEAN_ERROR }
}

//Re-assign store if user is logged in
export const logInUser = (user) => {
  return { type: actionTypes.RE_LOGIN_USER, payload: user }
}

//WRITING
// const setWriting = () => {
//   return { type: actionTypes.START_CREATING_ITEM }
// }

// CREATE ITEMS ACTIONS

// const createItemAction = () => {
//   return {
//     type: actionTypes.CREATE_ITEM,
//   }
// }

// export const createItem = (paramItem) => {
//   const { item, category } = paramItem
//   console.log(item, category)
//   const { currentUser } = auth
//   return (dispatch) => {
//     dispatch(setWriting())
//     db.ref(`/users/${currentUser.uid}/items`)
//       .push({ item, category })
//       .then(() => {
//         // console.log('am intrat la then')
//         dispatch(createItemAction())
//       })
//       .catch((err) => {
//         // console.log('am intrat la eroare')
//         dispatch({ type: actionTypes.ERROR_CREATE_ITEM, payload: err })
//       })
//   }
// }
