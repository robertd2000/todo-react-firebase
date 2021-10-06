import {
  NOTES_ROUTE,
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
  PROFILE_ROUTE,
} from './utils/constants'
import Login from './components/Login'
import TodoList from './components/TodoList'
import SignIn from './components/SignUp'
import Profile from './components/Profile'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: SIGN_UP_ROUTE,
    Component: SignIn,
  },
]

export const privateRoutes = [
  {
    path: NOTES_ROUTE,
    Component: TodoList,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
]
