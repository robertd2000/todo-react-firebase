import { ListItemText, Paper } from '@mui/material'
import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@mui/material/Checkbox'
import { Delete } from '@material-ui/icons'
import Modal from './Modal'
import logo from '../logo.svg'

const styles = {
  Icon: {
    marginLeft: 'auto',
  },
  Paper: {
    margin: 'auto',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    width: 700,
  },
  Checbox: {
    marginRight: 10,
  },
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const TodoItem = ({
  title,
  text,
  author,
  done,
  createdAt,
  deletePost,
  doneTodoHandler,
  id,
  send,
  user,
}) => {
  return (
    <>
      <Grid
        className={`fade-out`}
        item
        xs={12}
        style={{
          padding: '10px',
        }}
      >
        <Paper elevation={2} style={styles.Paper}>
          <Checkbox
            {...label}
            defaultChecked={done}
            style={styles.Checbox}
            onChange={() => doneTodoHandler(id)}
          />

          {/* {user.photoURL ? (
            <img src={user.photoURL.split(':').slice(1).join(':')} />
          ) : (
            <img src={logo} />
          )} */}

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ListItemText primary={author} secondary={createdAt} />
            </Grid>
            <Grid item xs={7}>
              <ListItemText
                primary={title}
                style={{ fontSize: '1.2rem  !important ' }}
              />
              <ListItemText primary={text} />
            </Grid>
          </Grid>
          <Modal id={id} send={send} title={title} text={text} />
          <IconButton
            onClick={() => deletePost(id)}
            color="secondary"
            aria-label="Delete"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TodoItem
