import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  NOTES_ROUTE,
  PROFILE_ROUTE,
  SIGN_UP_ROUTE,
} from '../utils/constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FirebaseContext } from '../firebase'
import { Image } from '@material-ui/icons'
import logo from '../logo.svg'
import { Box } from '@material-ui/core'

const Navbar = () => {
  const { auth } = useContext(FirebaseContext)
  const [user] = useAuthState(auth)

  return (
    <AppBar color={'primary'} position={'static'}>
      <Toolbar variant={'dense'}>
        {user && (
          <>
            <NavLink to={NOTES_ROUTE}>
              <Box
                component="div"
                sx={{ color: 'white', display: 'inline', marginRight: 20 }}
              >
                <img
                  style={{ maxWidth: 50, minWidth: 40, margin: 5 }}
                  src={user.photoURL}
                />
              </Box>
            </NavLink>

            <NavLink style={{ width: 200 }} to={PROFILE_ROUTE}>
              <Box
                component="div"
                style={{
                  color: 'white',
                  display: 'inline',
                  marginLeft: 20,
                  width: 100,
                }}
              >
                {user.displayName}
              </Box>
            </NavLink>
          </>
        )}
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
