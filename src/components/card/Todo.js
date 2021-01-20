import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Create from '../../pages/Create'
import './Todo.css'

const Todo = (props) => {
  const {
    category,
    item,
    deleteHandler,
    checkHandler,
    complete,
    itemkey,
    timestamp,
    lista,
  } = props
  // console.log('din todo props=', props)
  return (
    <div className='row vio'>
      <div className='col s12 '>
        <div
          className={`${
            complete
              ? 'card orange lighten-4 '
              : 'card blue-grey darken-1 hoverable z-depth-1'
          }
          `}
        >
          <div className='card-content white-text'>
            <p className={`${complete ? 'outer' : null}`}>
              <span
                className={`${
                  complete ? 'card-title complete inner' : 'card-title '
                }`}
              >
                {item}
              </span>
            </p>
            <div
              className={`${
                complete ? 'divider deep-orange accent-4' : 'divider '
              }`}
            ></div>
            <div className='category'>
              <p className={`${complete ? 'outer' : null}`}>
                <span className={`${complete ? 'inner' : null}`}>
                  {category}
                </span>
              </p>
              <p className={`${complete ? 'outer timesize' : 'timesize'}`}>
                <span className={`${complete ? 'inner timesize' : 'timesize'}`}>
                  {moment(timestamp).format('MMM Do')}
                </span>
              </p>
            </div>
          </div>
          <div className='card-action '>
            <a href='#'>
              <i
                className={`${
                  complete
                    ? 'material-icons deep-orange-text checkv'
                    : 'material-icons white-text checkv'
                }`}
                onClick={checkHandler}
              >
                check
              </i>
            </a>
            <Link
              to={{
                pathname: '/create',
                title: 'Edit item',
                btn_title: 'EDIT',
                todo: `${item}`,
                categ: `${category}`,
                labelTodoValue: 'new value ',
                labelCategValue: 'new category',
                dispatchedAction: 'edit',
                itemId: `${itemkey}`,
                list: lista,
              }}
            >
              <i className='material-icons  orange-text accent-3 editv'>edit</i>
            </Link>

            <i
              className='material-icons red-text deletev'
              onClick={deleteHandler}
            >
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
