import { useNavigate } from 'react-router-dom'
import { SignupForm } from '../components/auth/SignupForm'

export function SignupPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <SignupForm onSuccess={() => navigate('/login')} />
    </div>
  )
}
