import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = ({ name }) => {
  return (
    <div
      className='container'
      style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h4 className='center blue-grey-text '>Welcome to our todo list app </h4>
      <h5 className='center blue-grey-text '>
        <Link style={{ color: 'red' }} to='/signin'>
          Login
        </Link>{' '}
        or{' '}
        <Link style={{ color: 'red' }} to='/signup'>
          SignUp
        </Link>{' '}
        and let's have some fun
      </h5>
    </div>
  )
}
const mapStateToProps = (state) => {
  const { name } = state.authState
  return { name }
}
export default connect(mapStateToProps)(Home)
