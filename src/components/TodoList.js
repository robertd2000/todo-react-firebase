import React, { useContext, useEffect, useState } from 'react'
import { collection, query, doc, getDocs, addDoc } from 'firebase/firestore'
import { Container } from '@mui/material'
import { FirebaseContext, firestore } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import TodoItem from './TodoItem'
import { Grid, List } from '@material-ui/core'
import Input from './Input'
import { Box } from '@mui/system'
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
      newList.push(doc.data())
    })
    return newList
  }

  console.log(list)

  const send = async (title, text, user) => {
    const data = {
      title: title.value,
      text: text.value,
      author: user.email,
      authoeId: user.uid,
      id: user.uid + Math.random(),
      createdAt: new Date().toLocaleString(),
      done: false,
    }
    console.log(data)
    await addDoc(collection(todosRef, user.email), data)
    setList(() => {
      return [...list, data]
    })
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
                  title={item.title}
                  text={item.text}
                  author={item.author}
                  done={item.done}
                  createdAt={item.createdAt}
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
