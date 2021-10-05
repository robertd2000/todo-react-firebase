// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import firebase from 'firebase'
import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

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

export { auth, app, firestore }
