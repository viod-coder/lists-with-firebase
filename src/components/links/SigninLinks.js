import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../../pages/Home'
import Newtodo from '../../pages/Newtodo'

const SigninLinks = () => {
  return (
    <Switch>
      {/* <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} /> */}
      <Route path='/create' component={Newtodo} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  )
}

export default SigninLinks
