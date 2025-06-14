import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface IProps {
  isAllowed: boolean
  goto: string
  children: ReactNode
}

const ProtectedRoute = ({ children, goto, isAllowed }: IProps) => {
  if (!isAllowed) {
    return <Navigate to={goto} />
  }
  return children
}

export default ProtectedRoute
