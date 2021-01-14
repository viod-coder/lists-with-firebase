import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './pages.css'
import { connect } from 'react-redux'
import { modalClose } from '../store/actions/actions'
import { createItem, editItem, itemExists } from '../store/actions/itemActions'
import Spinner from '../components/spinner/Spinner'
import InputField from '../components/common/InputField'

const Create = (props) => {
  const {
    error,
    writing,
    modalClose,
    createItem,
    items,
    editItem,
    itemExists,
  } = props
  const {
    title,
    labelTodoValue,
    labelCategValue,
    btn_title,
    todo = '',
    categ = '',
    dispatchedAction,
    itemId,
  } = props.location

  const history = useHistory()
  let refTodo = useRef()
  let refCateg = useRef()
  // console.log('refcat=', refCateg.current)

  const [mytodo, setTodo] = useState(todo)
  const [mycateg, setCateg] = useState(categ)

  const submitHandler = (e) => {
    e.preventDefault()
    let categoryChecked
    if (refCateg.current.value === '') {
      categoryChecked = 'uncategorized'
    } else {
      categoryChecked = refCateg.current.value.toLowerCase()
    }

    const item = {
      item: refTodo.current.value.toLowerCase(),
      category: categoryChecked,
      itemID: itemId,
    }
    const checkItem = items.filter((crt) => crt.item === item.item)
    if (dispatchedAction === 'add') {
      if (checkItem.length > 0) {
        itemExists(item.item)
      } else {
        createItem(item)
      }
    }
    if (dispatchedAction === 'edit') {
      if (checkItem.length > 0) {
        itemExists(item.item)
      } else {
        editItem(item)
      }
    }
    if (checkItem.length === 0) {
      modalClose('#modal3')
      history.push('/')
    }
  }
  const cancelHandler = () => {
    modalClose('#modal3')
    history.push('/')
  }
  const handleChange1 = (e) => {
    setTodo(e.target.value)
  }
  const handleChange2 = (e) => {
    setCateg(e.target.value)
  }
  useEffect(() => {
    var elems = document.querySelectorAll('#modal3')
    var elem = document.querySelector('#modal3')
    var instances = window.M.Modal.init(elems, { dismissible: false })
    var instance = window.M.Modal.getInstance(elem)
    instance.open()
  }, [])
  useEffect(() => {
    refTodo.current.focus()
  }, [])

  return (
    <div id='modal3' className='modal'>
      <div className='modal-content'>
        <form className='white'>
          <h5 className='grey-text text-darken-3'>{title}</h5>
          <InputField
            nameValue={labelTodoValue}
            idValue='todo'
            typeValue='text'
            refInputValue={refTodo}
            inputvalue={mytodo}
            changeHandler={handleChange1}
          />
          <InputField
            nameValue={labelCategValue}
            idValue='category'
            typeValue='text'
            refInputValue={refCateg}
            inputvalue={mycateg}
            changeHandler={handleChange2}
          />

          <div className='btn-sign'>
            {writing ? (
              <div className='center'>
                <Spinner />
              </div>
            ) : (
              <button
                className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
                disabled={
                  writing
                    ? true
                    : refTodo.current === undefined
                    ? true
                    : refTodo.current.value === ''
                    ? true
                    : false
                }
                onClick={submitHandler}
              >
                {btn_title}
              </button>
            )}
            <button
              className='btn pink lighten-1 z-depth-0 waves-effect waves-light'
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
const mapStateToProps = ({ authState, itemState }) => {
  const { loading, uid } = authState
  const { writing, error, items } = itemState
  return { error, loading, uid, writing, items }
}

export default connect(mapStateToProps, {
  modalClose,
  createItem,
  editItem,
  itemExists,
})(Create)
