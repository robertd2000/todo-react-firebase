import React, { useContext, useEffect, useState } from 'react'
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { Container } from '@mui/material'
import { FirebaseContext } from '../firebase'
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

  useEffect(() => {
    initialize().then((data) => {
      setList(data)
      setLoading(false)
    })
  }, [])

  const initialize = async () => {
    setLoading(true)

    const q = query(collection(firestore, 'todos', user.email, user.email))
    const querySnapshot = await getDocs(q)
    let newList = []
    querySnapshot.forEach((doc) => {
      newList = [
        ...newList,
        {
          ...doc.data(),
          uid: doc.id,
        },
      ]
    })
    return newList
  }

  const send = async (title, text, user) => {
    const data = {
      title: title.value,
      text: text.value,
      author: user.email,
      authoeId: user.uid,
      id: user.uid + Math.random(),
      createdAt: Timestamp.now().toDate().toLocaleString(),
      done: false,
    }
    await addDoc(collection(todosRef, user.email), data)
    setList(() => {
      return [...list, data]
    })
  }

  const deleteTodo = async (postId) => {
    console.log(postId)
    await deleteDoc(doc(todosRef, user.email, postId))
    const newList = list.filter((item) => item.uid !== postId)
    setList(newList)
  }

  const updateTodo = async (title, text, postId) => {
    await updateDoc(doc(todosRef, user.email, postId), {
      title: title.value,
      text: text.value,
    })

    let current = list.filter((item) => item.uid === postId)
    const listPrev = list.filter((item) => item.uid !== postId)
    current = current[0]
    const newList = [
      ...listPrev,
      {
        ...current,
        title: title.value,
        text: text.value,
      },
    ]
    setList(newList)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input send={send} user={user} />
        </Grid>
        <Grid item xs={8}>
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
