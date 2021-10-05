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

  const isInvalid = title.value === '' || text.value === ''

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
          error={isInvalid}
          label="Заголовок"
          variant="standard"
          {...title}
          placeholder="Заголовок"
          helperText="Некорректный ввод"
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          error={isInvalid}
          label="Контент"
          variant="standard"
          {...text}
          placeholder="Контент"
          helperText="Некорректный ввод"
        />
      </div>
      <Button
        style={{ margin: 10 }}
        variant={'contained'}
        disabled={isInvalid}
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
