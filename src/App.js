import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FirebaseContext } from './firebase'
import Loader from './components/Loader'

function App() {
  const { auth } = useContext(FirebaseContext)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader />
  }
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
