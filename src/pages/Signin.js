import React, { useEffect, useRef } from 'react'
// import firebase from 'firebase'
import { Redirect, useHistory } from 'react-router-dom'
import './pages.css'
import { auth } from '../init-firebase'
import { connect } from 'react-redux'
import { userLogin, errorCleaning, modalClose } from '../store/actions/actions'
import Spinner from '../components/spinner/Spinner'

const Signin = ({
  userLogin,
  error,
  loading,
  errorCleaning,
  modalClose,
  uid,
}) => {
  // const [user, setUser] = useState('')
  // const [err, setErr] = useState('')
  const history = useHistory()
  let refEmail = useRef()
  let refPassword = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
    userLogin(
      refEmail.current.value,
      refPassword.current.value,
      history,
      '#modal1'
    )
  }
  const cancelHandler = () => {
    // var elem = document.querySelector('#modal1')
    // var instance = window.M.Modal.getInstance(elem)
    // instance.close()
    modalClose('#modal1')
    errorCleaning()
    history.push('/')
    // setUser('gogu')
  }

  useEffect(() => {
    var elems = document.querySelectorAll('#modal1')
    var elem = document.querySelector('#modal1')
    var instances = window.M.Modal.init(elems, { dismissible: false })
    var instance = window.M.Modal.getInstance(elem)
    instance.open()
  }, [])

  // if (uid) {
  //   var elem = document.querySelector('#modal1') //'#modal1'
  //   var instance = window.M.Modal.getInstance(elem)
  //   instance.close()
  //   history.push('/')
  // }

  return (
    <div id='modal1' className='modal'>
      <div className='modal-content'>
        <form className='white'>
          <h5 className='grey-text text-darken-3'>Login Page</h5>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' ref={refEmail} />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' ref={refPassword} />
          </div>
          <div className='btn-sign'>
            {/* <div className='input-field'> */}
            {loading ? (
              <div className='center'>
                {/* <h5 className='red-text'>Loading...</h5> */}
                <Spinner />
              </div>
            ) : (
              <button
                className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
                disabled={loading}
                onClick={submitHandler}
              >
                Login
              </button>
            )}

            {/* </div> */}
            {/* <div className=' input-field '> */}

            <button
              className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
              disabled={loading}
              onClick={cancelHandler}
            >
              Cancel
            </button>
            {/* </div> */}
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
  userLogin,
  errorCleaning,
  modalClose,
})(Signin)
