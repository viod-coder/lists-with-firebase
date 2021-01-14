import React, { useEffect, useState } from 'react'
import Todo from '../components/card/Todo'
import { connect } from 'react-redux'
import {
  fetchItems,
  checkConnection,
  deleteItem,
  changeComplete,
  editItem,
} from '../store/actions/itemActions'
import Spinner from '../components/spinner/Spinner'

const Dashboard = ({
  name,
  items,
  writing,
  fetchItems,
  deleteItem,
  changeComplete,
  editItem,
}) => {
  const [dummy, setDummy] = useState(false)
  useEffect(() => {
    // checkConnection()
    fetchItems()
  }, [fetchItems])

  const deleteinreg = (param) => {
    deleteItem(param)
  }
  const editinreg = (param) => {
    editItem(param)
  }
  const checkedit = (param) => {
    changeComplete(param)
  }

  return (
    <div className='container'>
      <h4
        className='center blue-grey-text firstCap'
        style={{ marginTop: '35px' }}
      >
        {name ? `${name.split(' ')[0]}'s list` : null}
      </h4>
      <ul>
        <li>
          {!writing ? (
            items &&
            items.map((item) => {
              return (
                <Todo
                  key={item.itemkey}
                  {...item}
                  deleteHandler={deleteinreg.bind(this, item.itemkey)}
                  editHandler={editinreg.bind(this, item)}
                  checkHandler={checkedit.bind(this, item)}
                />
              )
            })
          ) : (
            <Spinner />
          )}
          {items.length === 0 ? (
            <div
              className='container'
              style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h4 className='center blue-grey-text '>
                No items in your list ! Let's add some !
              </h4>
            </div>
          ) : null}
        </li>
      </ul>
    </div>
  )
}
const mapStateToProps = (state) => {
  const { name } = state.authState
  const { items, writing } = state.itemState
  return { name, items, writing }
}
export default connect(mapStateToProps, {
  fetchItems,
  checkConnection,
  deleteItem,
  changeComplete,
  editItem,
})(Dashboard)
