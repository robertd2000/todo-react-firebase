import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE, SIGN_UP_ROUTE } from '../utils/constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FirebaseContext } from '../firebase'

const Navbar = () => {
  const { auth } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return (
    <AppBar color={'primary'} position={'static'}>
      <Toolbar variant={'dense'}>
        {user && <Grid>{user.email}</Grid>}
        <Grid container justifyContent={'flex-end'}>
          {!user ? (
            <>
              <NavLink to={LOGIN_ROUTE}>
                <Button style={{ color: 'white' }} variant={'outlined'}>
                  Логин
                </Button>
              </NavLink>
              <NavLink to={SIGN_UP_ROUTE}>
                <Button style={{ color: 'white' }} variant={'outlined'}>
                  Регистрация
                </Button>
              </NavLink>
            </>
          ) : (
            <Button
              onClick={() => auth.signOut()}
              style={{ color: 'white' }}
              variant={'outlined'}
            >
              Выйти
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
