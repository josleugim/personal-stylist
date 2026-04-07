import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null  // or a spinner

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
