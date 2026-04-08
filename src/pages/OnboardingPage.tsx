import { useNavigate } from 'react-router-dom'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 items-start justify-center px-4 py-16">
      <OnboardingWizard onComplete={() => navigate('/')} />
    </div>
  )
}
