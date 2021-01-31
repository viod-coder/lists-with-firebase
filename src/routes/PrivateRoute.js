import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'

const PrivateRoute = ({ component: Component, uid, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return uid ? <Component {...props} /> : <Home />
      }}
    />
  )
}
const mapStateToProps = (state) => {
  const { uid } = state.authState
  return { uid }
}
export default connect(mapStateToProps)(PrivateRoute)
