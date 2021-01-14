import React, { useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/actions'

const Navbar = ({ logout, name, email, uid }) => {
  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav')
    var instances = window.M.Sidenav.init(elems, {})
    var elems1 = document.querySelectorAll('.tooltipped')
    var instances1 = window.M.Tooltip.init(elems1, {})
  }, [])
  let initials = ''
  if (name) {
    let a = name.split(' ')
    initials = a.reduce((x, y) => x[0] + y[0])
  }
  return (
    <nav className='blue-grey darken-2'>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo logo-vio'>
          {initials.toUpperCase() || 'My lists app'}
        </Link>
        <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </a>
        {uid && (
          <Link
            className='btn-floating btn-large tooltipped halfway-fab waves-effect waves-light red vio-button'
            data-position='left'
            data-tooltip="Let's add some items"
            to={{
              pathname: '/create',
              title: 'Add new item ',
              btn_title: 'ADD',
              labelTodoValue: 'add new item',
              labelCategValue: "item's category",
              dispatchedAction: 'add',
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
  return { name, email, uid }
}
export default connect(mapStateToProps, { logout })(Navbar)
