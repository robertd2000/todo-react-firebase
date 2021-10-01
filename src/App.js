import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import { Route } from 'react-router-dom'
import { NOTES_ROUTE, LOGIN_ROUTE } from './utils/constants'
import Login from './components/Login'
import TodoList from './components/TodoList'
function App() {
  console.log(AppRouter)

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      {/* <Route path={NOTES_ROUTE} component={TodoList} exact={true} />
      <Route path={LOGIN_ROUTE} component={Login} exact={true} /> */}
    </BrowserRouter>
  )
}

export default App
