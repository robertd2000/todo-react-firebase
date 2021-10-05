import { ListItem, ListItemText, Paper } from '@mui/material'
import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Delete, Build } from '@material-ui/icons'

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
    width: 500,
  },
}

const TodoItem = ({ title, text, author, done, createdAt }) => {
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
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <ListItemText primary={author} secondary={createdAt} />
            </Grid>
            <Grid item xs={7}>
              <ListItemText
                primary={title}
                style={{ fontSize: '1.2rem  !important; ' }}
              />
              <ListItemText primary={text} />
            </Grid>
          </Grid>

          <IconButton color="secondary" aria-label="Delete">
            <Delete fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default TodoItem
