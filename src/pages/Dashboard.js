import React, { useEffect, useState } from 'react'
import Todo from '../components/card/Todo'
import { connect } from 'react-redux'
import {
  fetchItems,
  deleteItem,
  changeComplete,
  editItem,
  restoreItemState,
} from '../store/actions/itemActions'
import {
  fetchLists,
  noListsHere,
  setCurrentList,
} from '../store/actions/listActions'
import Spinner from '../components/spinner/Spinner'

const Dashboard = ({
  name,
  items,
  writing,
  fetchItems,
  deleteItem,
  changeComplete,
  editItem,
  currentList,
  fetchLists,
  error,
  lists,
  setCurrentList,
}) => {
  const [dummy, setDummy] = useState(false)

  useEffect(() => {
    if (name) {
      fetchLists()
      if (lists.length && !currentList) {
        setCurrentList(lists[0])
      }
    }
  }, [fetchLists, error, setCurrentList])
  useEffect(() => {
    if (currentList) {
      fetchItems(currentList)
    } else if (lists.length) {
      setCurrentList(lists[0])
      fetchItems(lists[0])
    } else {
      noListsHere()
      // restoreItemState()
    }
  }, [currentList, fetchItems, noListsHere, setCurrentList])

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
        {name && !error ? `${name.split(' ')[0]}'s ${currentList} list` : null}
      </h4>
      <ul>
        <li>
          {!writing ? (
            error ? null : (
              items &&
              items.map((item) => {
                const newItem = { ...item, lista: currentList }
                return (
                  <Todo
                    key={item.itemkey}
                    {...newItem}
                    deleteHandler={deleteinreg.bind(this, newItem)}
                    editHandler={editinreg.bind(this, newItem)}
                    checkHandler={checkedit.bind(this, newItem)}
                  />
                )
              })
            )
          ) : (
            <Spinner />
          )}
          {/* {items.length === 0 && !error ? (
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
          ) : null} */}
          {error ? (
            <div
              className='container'
              style={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h4 className='center blue-grey-text '>{error}</h4>
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
  const { currentList, error, lists } = state.listState
  return { name, items, writing, currentList, error, lists }
}
export default connect(mapStateToProps, {
  fetchItems,
  deleteItem,
  changeComplete,
  editItem,
  fetchLists,
  setCurrentList,
  noListsHere,
  restoreItemState,
})(Dashboard)
