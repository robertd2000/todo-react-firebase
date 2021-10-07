// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import firebase from 'firebase'
import { getAuth } from 'firebase/auth'

import {
  getFirestore,
  query,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
// Initialize Firebase
const app = initializeApp(config)
const auth = getAuth()
const firestore = getFirestore()

const initialize = async (user) => {
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

const sendData = async (data, user, todosRef, list) => {
  await addDoc(collection(todosRef, user.email), data)
  return [...list, data]
}

const deleteData = async (postId, user, todosRef, list) => {
  await deleteDoc(doc(todosRef, user.email, postId))
  return list.filter((item) => item.uid !== postId)
}

const updateData = async (postId, user, todosRef, title, text, list) => {
  console.log(postId, user, todosRef, title, text, list)
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
  return newList
}

const doneTodo = async (postId, user, todosRef, list) => {
  let current = list.filter((item) => item.uid === postId)
  current = current[0]

  console.log(current)
  await updateDoc(doc(todosRef, user.email, postId), {
    done: !current.done,
  })

  const listPrev = list.filter((item) => item.uid !== postId)
  const newList = [
    ...listPrev,
    {
      ...current,
      done: !current.done,
    },
  ]
  console.log(newList)
  return newList
}

export {
  auth,
  app,
  firestore,
  sendData,
  initialize,
  deleteData,
  updateData,
  doneTodo,
}
