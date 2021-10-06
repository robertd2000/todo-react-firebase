import { Box, Divider, Grid } from '@material-ui/core'
import React from 'react'

const ProfileCard = ({ name, photo, email }) => {
  return (
    <Grid className="profileItem" container>
      <Grid item xs={4}>
        <Box>
          {photo && <img className="profilePhoto" src={`${photo}`}></img>}
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Box className="profileItemCard">
          Имя пользователя {name && <p>{name}</p>}
        </Box>
        <Divider />

        <Box className="profileItemCard">
          Почта пользователя{email && <p>{email}</p>}
        </Box>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default ProfileCard
