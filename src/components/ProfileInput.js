import React, { useState } from 'react'
import { Box, Button, Grid, IconButton } from '@material-ui/core'
import { TextField } from '@mui/material'
import { Close } from '@material-ui/icons'

const ProfileInput = ({
  onImageChange,
  isInvalid,
  newName,
  onEditMode,
  updateProfile,
}) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      <Box
        component="form"
        justifyContent={'center'}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <div>
          <TextField
            className="profileInput"
            id="standard-basic"
            error={isInvalid}
            label="Имя пользователя"
            variant="standard"
            {...newName}
            placeholder="Имя пользователя"
            disabled={!editMode}
          />
        </div>
        <div>
          <input
            className="profileInput"
            type="file"
            name="photo"
            onChange={onImageChange}
            disabled={!editMode}
          />
        </div>

        <Button
          className="profileInput"
          style={{ marginTop: 15 }}
          variant={'contained'}
          disabled={isInvalid}
          onClick={() => onEditMode(editMode, setEditMode, updateProfile)}
        >
          Редактировать профиль
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

export default ProfileInput
