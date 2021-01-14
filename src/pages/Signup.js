import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { userSignup, errorCleaning, modalClose } from '../store/actions/actions'
import Spinner from '../components/spinner/Spinner'
import './pages.css'

const Signup = ({
  userSignup,
  error,
  loading,
  errorCleaning,
  modalClose,
  uid,
}) => {
  const [btnpress, setBtnPress] = useState('') // dummy usestate pt rerender la pagina cand completezi in input
  let refEmail = useRef()
  let refPassword = useRef()
  let refFirstName = useRef()
  let refLastName = useRef()

  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    // refEmail.current === undefined ||
    // refPassword.current === undefined ||
    // refFirstName.current === undefined ||
    // refLastName.current === undefined
    //   ? console.log('first check true')
    //   : refEmail.current.value === '' ||
    //     refPassword.current.value === '' ||
    //     refFirstName.current.value === '' ||
    //     refLastName.current.value === ''
    //   ? console.log(
    //       'second check true',
    //       refEmail.current,
    //       refPassword.current,
    //       refFirstName.current,
    //       refLastName.current,
    //       '///////',
    //       refEmail.current.value,
    //       refPassword.current.value,
    //       refFirstName.current.value,
    //       refLastName.current.value
    //     )
    //   : console.log('second check false')
    userSignup(
      refEmail.current.value,
      refPassword.current.value,
      refFirstName.current.value,
      refLastName.current.value,
      history,
      '#modal2'
    )
  }
  const cancelHandler = () => {
    modalClose('#modal2')
    errorCleaning()
    history.push('/')
  }

  useEffect(() => {
    var elems = document.querySelectorAll('#modal2')
    var elem = document.querySelector('#modal2')
    var instances = window.M.Modal.init(elems, { dismissible: false })
    var instance = window.M.Modal.getInstance(elem)
    instance.open()
  }, [])

  return (
    <div id='modal2' className='modal'>
      <div className='modal-content'>
        <form className='white'>
          <h5 className='grey-text text-darken-3'>SignUp Page</h5>
          <div className='input-field'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              autoComplete='off'
              ref={refFirstName}
              onChange={setBtnPress}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              autoComplete='off'
              ref={refLastName}
              onChange={setBtnPress}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              autoComplete='off'
              ref={refEmail}
              onChange={setBtnPress}
            />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              ref={refPassword}
              autoComplete='off'
              onChange={setBtnPress}
            />
          </div>
          <div className='btn-sign'>
            {loading ? (
              <div className='center'>
                <Spinner />
              </div>
            ) : (
              <button
                className='btn pink lighten-1 z-depth-0'
                onClick={submitHandler}
                disabled={
                  refEmail.current === undefined ||
                  refPassword.current === undefined ||
                  refFirstName.current === undefined ||
                  refLastName.current === undefined
                    ? true
                    : refEmail.current.value === '' ||
                      refPassword.current.value === '' ||
                      refFirstName.current.value === '' ||
                      refLastName.current.value === ''
                    ? true
                    : false
                }
              >
                Sign Up
              </button>
            )}

            <button
              className='btn pink lighten-1 z-depth-0'
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>

          {error && (
            <div>
              <h5 className='red-text'>{error}</h5>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
const mapStateToProps = ({ authState }) => {
  const { error, loading, uid } = authState
  return { error, loading, uid }
}
export default connect(mapStateToProps, {
  userSignup,
  errorCleaning,
  modalClose,
})(Signup)
