import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

<<<<<<< HEAD
import ProtectedRoute from '../components/auth/ProtectedRoute'
=======
import ProtectedRoute from '../auth/ProtectedRoute'
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee
import HomePage from '../pages'
import RootLayout from '../pages/Layout'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
<<<<<<< HEAD
import ErrorHandler from '../components/errors/ErrorHandler'
import ProfilePage from '../pages/Profile'
import TodosPage from '../pages/Todos'
=======
import ErrorHandler from '../errors/ErrorHandler'
import ProfilePage from '../pages/Profile'
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee

const getUser = localStorage.getItem('loggedInUser')

const userData = getUser? JSON.parse(getUser) :null
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />} path="/" errorElement={<ErrorHandler />}>
        <Route
          element={
            <ProtectedRoute goto="/login" isAllowed={userData?.jwt}>
              <HomePage />
            </ProtectedRoute>
          }
          index
        />
        <Route
          element={
            <ProtectedRoute goto="/login" isAllowed={userData?.jwt}>
              <ProfilePage />
            </ProtectedRoute>
          }
          path="profile"
        />
        <Route
          element={
<<<<<<< HEAD
            <ProtectedRoute goto="/login" isAllowed={userData?.jwt}>
              <TodosPage />
            </ProtectedRoute>
          }
          path="todos"
        />
        <Route
          element={
=======
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee
            <ProtectedRoute goto="/" isAllowed={!userData?.jwt}>
              <LoginPage />
            </ProtectedRoute>
          }
          path="login"
        />
        <Route
          element={
            <ProtectedRoute goto="/" isAllowed={!userData?.jwt}>
              <RegisterPage />
            </ProtectedRoute>
          }
          path="regiser"
        />
      </Route>
    </>
  )
)

export default router
