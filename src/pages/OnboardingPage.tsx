import { useNavigate } from 'react-router-dom'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'
import { token } from '@/lib/token'
import { profileApi } from '../api/profile'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 items-start justify-center px-4 py-16">
      <OnboardingWizard onComplete={ async (data) => {
        const userId = token.getUserId();
        const profileCreateBody = {
          user_id: userId || null,
          style_ids: data?.styleIds || [],
          body_type_ids: [data?.bodyTypeId],
          favorite_brand_ids: data?.brandIds || [],
          favorite_colors: data?.preferences?.favoriteColors,
          colors_to_avoid: data?.preferences?.colorsToAvoid,
          logo_tolerance: data?.preferences?.logoTolerance,
          fit_notes: data?.preferences?.fitNotes || '',
          budget: data?.preferences?.budget,
          location: data?.preferences?.location,
          hobbies: data?.preferences?.hobbies,
          sports: data?.preferences?.sports,
          age: data?.preferences?.age,
          height: data?.preferences?.height,
          gender: data?.preferences?.gender
        }

        try {
          const response = await profileApi.create(profileCreateBody);

          if (response) {
            navigate('/');
          }
        } catch(err) {
          console.error(err);
        }
        
      }} />
    </div>
  )
}
