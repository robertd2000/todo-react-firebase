import { Button, Container, Grid, Input } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { NOTES_ROUTE } from '../utils/constants'
import { withRouter } from 'react-router'

const style = {
  width: 400,
  margin: 20,
}

const Login = (props) => {
  const INITIAL = {
    email: '',
    password: '',
    error: null,
  }
  const [data, setData] = useState(INITIAL)
  const auth = getAuth()

  const onUpdate = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  const submit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setData(INITIAL)
        props.history.push(NOTES_ROUTE)
      })
      .catch((error) => {
        setData({ ...data, error })
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
        <Box
          component="form"
          justifyContent={'center'}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
        >
          <div>
            <Input
              name={'email'}
              onChange={onUpdate}
              value={data.email}
              placeholder={'email'}
              style={style}
            />
          </div>
          <div>
            <Input
              name={'password'}
              onChange={onUpdate}
              value={data.password}
              placeholder={'пароль'}
              style={style}
            />
          </div>
          <div>
            <Button
              style={{ margin: 20 }}
              variant={'contained'}
              onClick={submit}
            >
              Войти
            </Button>
          </div>
        </Box>
      </Grid>
      {data.error && <p>{data.error.message}</p>}
    </Container>
  )
}

export default withRouter(Login)
