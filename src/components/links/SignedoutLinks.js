import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'
import Signin from '../../pages/Signin'
import Signup from '../../pages/Signup'
import Errorpage from '../../pages/Errorpage'

const SignedoutLinks = () => {
  return (
    <Switch>
      <Route path='/signin' component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/error' component={Errorpage} />
      <Route path='/' exact component={Home} />
      <Redirect to='/error' />
    </Switch>
  )
}

export default SignedoutLinks
