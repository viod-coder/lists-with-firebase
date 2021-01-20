import React, { useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentList } from '../../store/actions/listActions'
import { logout } from '../../store/actions/actions'

const Navbar = ({
  logout,
  name,
  email,
  uid,
  lists,
  setCurrentList,
  currentList,
}) => {
  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav')
    window.M.Sidenav.init(elems, {})
    // var elems1 = document.querySelectorAll('.tooltipped')
    //window.M.Tooltip.init(elems1, {})
    var elems2 = document.querySelectorAll('.mybut')
    window.M.FloatingActionButton.init(elems2, {
      toolbarEnabled: true,
    })
  }, [uid])

  let initials = ''
  if (name) {
    let a = name.split(' ')
    initials = a.reduce((x, y) => x[0] + y[0])
  }

  let listaListe = null
  if (uid && lists) {
    listaListe = lists.map((a, index) => {
      return (
        <li key={index}>
          <p
            className='sidenav-close left-align'
            style={{
              color: '#1a237e',
              padding: '0 14px',
              textTransform: 'capitalize',
              cursor: 'pointer',
              fontSize: '17px',
            }}
            onClick={setCurrentList.bind(this, a)}
          >
            {a}
          </p>
        </li>
      )
    })
  }
  return (
    <nav className='blue-grey darken-2'>
      <div className='nav-wrapper'>
        <Link to='/' className=' brand-logo hide-on-large-only'>
          {initials.toUpperCase() || 'My lists app'}
        </Link>
        <a
          href='#'
          data-target='mobile-demo'
          className='sidenav-trigger show-on-large'
        >
          <i className='material-icons'>menu</i>
        </a>
        {uid && (
          <Link
            className='btn-floating btn-large tooltipped halfway-fab waves-effect waves-light red vio-button'
            to={{
              pathname: '/create',
              title: 'Add new item ',
              btn_title: 'ADD',
              labelTodoValue: 'add new item',
              labelCategValue: "item's category",
              dispatchedAction: 'add',
              list: currentList,
            }}
          >
            <i className='material-icons vios'>add</i>
          </Link>
        )}
        <ul className='right hide-on-med-and-down'>
          {!uid && (
            <li>
              <Link to='/signup'>SignUp</Link>
            </li>
          )}
          {!uid && (
            <li>
              <Link to='/signin'>Login</Link>
            </li>
          )}
          {uid && (
            <li>
              <a href='#' onClick={() => logout()}>
                Logout
              </a>
            </li>
          )}
        </ul>
        <ul className='sidenav' id='mobile-demo'>
          <li>
            <div className='user-view'>
              <a href='#name'>
                <span className='red-text name'>{name || 'Welcome'}</span>
              </a>
              <a href='#email'>
                <span className='red-text email'>{email || 'guest'}</span>
              </a>
              <div className='divider'></div>
            </div>
          </li>
          {/* {uid && (
            <li>
              <a href='#' onClick={() => logout()} className='sidenav-close'>
                <i className='vio-add-btn material-icons red white-text center'>
                  add
                </i>
                Create new list
              </a>
              <div className='divider'></div>
            </li>
          )} */}
          {listaListe}
          {listaListe && (
            <div className='pad-zero user-view '>
              <div className='divider'></div>
            </div>
          )}
          {!uid && (
            <li>
              <Link className='modal-trigger sidenav-close' to='/signup'>
                <i className='material-icons'>border_color</i>Sign Up
              </Link>
            </li>
          )}
          {!uid && (
            <li>
              <Link className='modal-trigger sidenav-close' to='/signin'>
                <i className='material-icons'>call_made</i>Login
              </Link>
            </li>
          )}
          {uid && (
            <li>
              <a href='#' onClick={() => logout()} className='sidenav-close'>
                <i className='material-icons'>clear</i>Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
const mapStateToProps = (state) => {
  const { name, email, uid } = state.authState
  const { lists, currentList } = state.listState
  return { name, email, uid, lists, currentList }
}
export default connect(mapStateToProps, { logout, setCurrentList })(Navbar)
