import React, { useContext, useEffect, useState } from 'react'
import { doc, Timestamp } from 'firebase/firestore'
import { Container } from '@mui/material'
import {
  FirebaseContext,
  sendData,
  initialize,
  deleteData,
  updateData,
  doneTodo,
} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import TodoItem from './TodoItem'
import { Grid, List } from '@material-ui/core'
import Input from './Input'
import Loader from './Loader'

const TodoList = () => {
  const { auth, firestore } = useContext(FirebaseContext)

  const [user] = useAuthState(auth)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const todosRef = doc(firestore, 'todos', user.email)
  console.log(list)

  useEffect(async () => {
    setLoading(true)
    const data = await initialize(user)

    setList(data)
    setLoading(false)
  }, [])

  const send = async (title, text, user) => {
    let id = user.uid + Math.random()
    const data = {
      title: title.value,
      text: text.value,
      author: user.displayName,
      authoeId: user.uid,
      id,
      createdAt: Timestamp.now().toDate().toLocaleString(),
      done: false,
    }

    await sendData(data, user, todosRef, list)
    const initializedList = await initialize(user)
    setList(initializedList)
  }

  const deleteTodo = async (postId) => {
    await deleteData(postId, user, todosRef, list)
    const initializedList = await initialize(user)
    setList(initializedList)
  }

  const updateTodo = async (title, text, postId) => {
    const updatedData = await updateData(
      postId,
      user,
      todosRef,
      title,
      text,
      list
    )
    setList(updatedData)
  }

  const doneTodoHandler = async (postId) => {
    const newList = await doneTodo(postId, user, todosRef, list)
    setList(newList)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input send={send} user={user} />
        </Grid>
        <Grid item xs={9}>
          <List>
            {list.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  id={item.uid}
                  title={item.title}
                  text={item.text}
                  author={item.author}
                  done={item.done}
                  createdAt={item.createdAt}
                  deletePost={deleteTodo}
                  send={updateTodo}
                  doneTodoHandler={doneTodoHandler}
                  user={user}
                />
              )
            })}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TodoList
