import { Button, Container, Grid, Input } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
// import firebase from 'firebase'
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { withRouter } from 'react-router'
import { NOTES_ROUTE } from '../utils/constants'

const SignIn = (props) => {
  const INITIAL = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  }
  const [data, setData] = useState(INITIAL)

  // const { auth: userAuth } = useContext(FirebaseContext)
  const auth = getAuth()
  const submit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, data.email, data.passwordOne)
      .then(() => {
        setData(INITIAL)
        props.history.push(NOTES_ROUTE)
      })
      .catch((error) => {
        setData({ ...data, error })
      })
  }

  const isInvalid =
    data.passwordOne !== data.passwordTwo ||
    data.passwordOne === '' ||
    data.email === '' ||
    data.username === ''

  const onUpdate = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box p={5}>
          <Input name="username" onChange={onUpdate} value={data.username} />
          логин
        </Box>
        <Box p={5}>
          <Input name="email" onChange={onUpdate} value={data.email} />
          email
        </Box>
        <Box p={5}>
          <Input
            name="passwordOne"
            onChange={onUpdate}
            value={data.passwordOne}
          />{' '}
          пароль
        </Box>
        <Box p={5}>
          <Input
            name="passwordTwo"
            onChange={onUpdate}
            value={data.passwordTwo}
          />
          подтвердить пароль
        </Box>
        <Box p={5}>
          <Button onClick={submit} disabled={isInvalid}>
            Зарегистрироваться
          </Button>
        </Box>
      </Grid>
      {data.error && <p>{data.error.message}</p>}
    </Container>
  )
}

export default withRouter(SignIn)
