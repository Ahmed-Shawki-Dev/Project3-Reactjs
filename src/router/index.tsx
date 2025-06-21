import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import ProtectedRoute from '../auth/ProtectedRoute'
import HomePage from '../pages'
import RootLayout from '../pages/Layout'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import ErrorHandler from '../errors/ErrorHandler'

const getUser = localStorage.getItem('loggedInUser')

const userData = getUser? JSON.parse(getUser) :null
console.log(userData?.jwt)
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />} path="/" errorElement={<ErrorHandler/>}>
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
              <h2>Profile Page</h2>
            </ProtectedRoute>
          }
          path='profile'
        />
        <Route
          element={
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
