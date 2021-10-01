import React, { useContext } from 'react'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { NOTES_ROUTE, LOGIN_ROUTE } from '../utils/constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FirebaseContext } from '../firebase'

const AppRouter = () => {
  const { auth } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={NOTES_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact={true} />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  )
}

export default AppRouter
