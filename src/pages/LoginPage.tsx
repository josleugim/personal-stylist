import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <LoginForm onSuccess={user => navigate(user.profile ? '/' : '/onboarding')} />
    </div>
  )
}
