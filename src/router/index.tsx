import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import RootLayout from '../pages/Layout'
import HomePage from '../pages'
import LoginPage from '../pages/Login'
import RegiserPage from '../pages/Regiser'
import ProtectedRoute from '../auth/ProtectedRoute'

const isLoggedIn = false

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
              <RegiserPage />
            </ProtectedRoute>
          }
          path="regiser"
        />
      </Route>
    </>
  )
)

export default router
