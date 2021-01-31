import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import Navbar from './components/navbar/navbar'
import Errorpage from './pages/Errorpage'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { auth } from './init-firebase'
import { logInUser } from './store/actions/actions'
import Create from './pages/Create'

const App = ({ uid, logInUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log('user from app', user)
        logInUser(user)
      } else {
        // console.log('onAuthStateChanged you are log out')
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' render={() => <Signup />} />
        <PrivateRoute exact path='/' component={Dashboard} />
        {/* <PrivateRoute exact path='/create' component={Create} /> */}
        <PrivateRoute exact path='/create' component={Create} />
        <Route exact path='/home' component={Home} />
        <Route path='*' component={Errorpage} />
      </Switch>
    </BrowserRouter>
  )
}
const mapStateToProps = (state) => {
  const { uid } = state.authState
  return { uid }
}

export default connect(mapStateToProps, { logInUser })(App)
