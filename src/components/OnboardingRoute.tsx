import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function OnboardingRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (!user) return <Navigate to="/login" replace />

  if (user.profile) return <Navigate to="/" replace />

  return <Outlet />
}
