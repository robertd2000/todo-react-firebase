import { Box, Button, Grid, IconButton, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useInput } from '../hooks/useInput'
import { Close } from '@material-ui/icons'

const PasswordChange = ({ passwordChange, onEditMode }) => {
  const newPasswordOne = useInput('111111')
  const newPasswordTwo = useInput('111111')

  const [editMode, setEditMode] = useState(false)

  const isInvalid =
    newPasswordOne.value === '' ||
    newPasswordTwo.value === '' ||
    newPasswordOne.value !== newPasswordTwo.value

  const onChangePassword = () => {
    console.log('passwordChange ' + newPasswordOne.value)
    passwordChange(newPasswordOne.value)
  }

  return (
    <div style={{ marginTop: 40 }}>
      <Box
        component="form"
        justifyContent={'center'}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <div>
          <TextField
            type={'password'}
            className="profileInput"
            id="standard-basic"
            error={isInvalid}
            label="Введите пароль"
            variant="standard"
            {...newPasswordOne}
            placeholder="Введите пароль"
            disabled={!editMode}
          />
        </div>
        <div>
          <TextField
            type={'password'}
            className="profileInput"
            id="standard-basic"
            error={isInvalid}
            label="Подтвердите пароль"
            variant="standard"
            {...newPasswordTwo}
            placeholder="Подтвердите пароль"
            disabled={!editMode}
          />
        </div>

        <Button
          className="profileInput"
          style={{ marginTop: 15 }}
          variant={'contained'}
          //   disabled={isInvalid}
          onClick={() => onEditMode(editMode, setEditMode, onChangePassword)}
        >
          Изменить пароль
        </Button>
        {editMode && (
          <IconButton
            onClick={() => {
              setEditMode(false)
            }}
            color="secondary"
            aria-label="Delete"
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>
    </div>
  )
}

export default PasswordChange
