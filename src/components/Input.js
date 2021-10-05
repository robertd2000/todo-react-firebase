import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useInput } from '../hooks/useInput'

const InputItem = ({
  send,
  user,
  title: inputTitle,
  text: inputText,
  handleClose,
}) => {
  const title = useInput(inputTitle ?? '')
  const text = useInput(inputText ?? '')

  return (
    <Box
      component="form"
      justifyContent={'center'}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <div>
        <TextField
          id="standard-basic"
          label="Заголовок"
          variant="standard"
          {...title}
          placeholder="Заголовок"
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="Контент"
          variant="standard"
          {...text}
          placeholder="Контент"
        />
      </div>
      <Button
        style={{ margin: 10 }}
        variant={'contained'}
        onClick={() => {
          send(title, text, user)
          if (handleClose) {
            handleClose()
          }
        }}
      >
        Создать
      </Button>
    </Box>
  )
}

export default InputItem
