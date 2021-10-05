import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useInput } from '../hooks/useInput'

const InputItem = ({ send, user }) => {
  const title = useInput('')
  const text = useInput('')

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
        variant="outlined"
        onClick={() => send(title, text, user)}
      >
        Создать
      </Button>
    </Box>
  )
}

export default InputItem
