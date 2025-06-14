import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import RootLayout from '../pages/Layout'
import HomePage from '../pages'
import LoginPage from '../pages/Login'
import RegistratePage from '../pages/Registrate'
import ProtectedRoute from '../auth/ProtectedRoute'

const isLoggedIn = true

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />} path="/">
        <Route
          element={
            <ProtectedRoute goto="/login" isAllowed={isLoggedIn}>
              <HomePage />
            </ProtectedRoute>
          }
          index
        />
        <Route
          element={
            <ProtectedRoute goto="/" isAllowed={!isLoggedIn}>
              <LoginPage />
            </ProtectedRoute>
          }
          path="login"
        />
        <Route
          element={
            <ProtectedRoute goto="/" isAllowed={!isLoggedIn}>
              <RegistratePage />
            </ProtectedRoute>
          }
          path="registrate"
        />
      </Route>
    </>
  )
)

export default router
