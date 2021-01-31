import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './pages.css'
import { connect } from 'react-redux'
import { userLogin, errorCleaning, modalClose } from '../store/actions/actions'
import Spinner from '../components/spinner/Spinner'

const Newtodo = ({
  userLogin,
  error,
  loading,
  errorCleaning,
  modalClose,
  uid,
}) => {
  const history = useHistory()
  let refTodo = useRef()
  let refCategory = useRef()

  const submitHandler = (e) => {
    e.preventDefault()
    // userLogin(
    //   refEmail.current.value,
    //   refPassword.current.value,
    //   history,
    //   '#modal3'
    // )
  }
  const cancelHandler = () => {
    modalClose('#modal3')
    errorCleaning()
    history.push('/')
  }

  useEffect(() => {
    var elems = document.querySelectorAll('#modal3')
    var elem = document.querySelector('#modal3')
    var instances = window.M.Modal.init(elems, { dismissible: false })
    var instance = window.M.Modal.getInstance(elem)
    instance.open()
  }, [])

  return (
    <div id='modal3' className='modal'>
      <div className='modal-content'>
        <form className='white'>
          <h5 className='grey-text text-darken-3'>Add new article</h5>
          <div className='input-field'>
            <label htmlFor='content'>Content</label>
            <input type='text' id='content' ref={refTodo} />
          </div>
          <div className='input-field'>
            <label htmlFor='category'>Category</label>
            <input type='text' id='category' ref={refCategory} />
          </div>
          <div className='btn-sign'>
            {loading ? (
              <div className='center'>
                <Spinner />
              </div>
            ) : (
              <button
                className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
                disabled={loading}
                onClick={submitHandler}
              >
                Add to list
              </button>
            )}
            <button
              className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
              disabled={loading}
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
  userLogin,
  errorCleaning,
  modalClose,
})(Newtodo)
