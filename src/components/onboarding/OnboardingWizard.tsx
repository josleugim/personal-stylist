import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StyleStep } from './StyleStep'
import { BodyTypeStep } from './BodyTypeStep'
import { BrandStep } from './BrandStep'
import { PreferencesStep } from './PreferencesStep'
import type { Preferences } from './PreferencesStep'

const STEPS = ['Style', 'Body Type', 'Brands', 'Preferences'] as const
type StepIndex = 0 | 1 | 2 | 3

interface Selection {
  styleIds:    number[]
  bodyTypeId:  number | null
  brandIds:    string[]
  preferences: Preferences
}

interface Props {
  onComplete: (selection: Selection) => void
}

const DEFAULT_PREFERENCES: Preferences = {
  favoriteColors: [],
  colorsToAvoid:  [],
  budget:         null,
  logoTolerance:  null,
  location:       '',
  fitNotes:       '',
  hobbies:        [],
  sports:         [],
  age:            null,
  height:         null,
  gender: null
}

export function OnboardingWizard({ onComplete }: Props) {
  const [step, setStep]           = useState<StepIndex>(0)
  const [selection, setSelection] = useState<Selection>({
    styleIds:    [],
    bodyTypeId:  null,
    brandIds:    [],
    preferences: DEFAULT_PREFERENCES,
  })

  const progress   = ((step + 1) / STEPS.length) * 100
  const isLastStep = step === STEPS.length - 1

  const { budget, location, age, height } = selection.preferences
  const canContinue =
    step === 0 ? selection.styleIds.length > 0
    : step === 1 ? selection.bodyTypeId !== null
    : step === 2 ? selection.brandIds.length > 0
    : budget !== null && location.trim() !== '' && age !== null && height !== null

  function handleNext() {
    if (isLastStep) {
      onComplete(selection)
    } else {
      setStep(s => (s + 1) as StepIndex)
    }
  }

  const headings: Record<StepIndex, { title: string; subtitle: string }> = {
    0: { title: 'Choose your style',      subtitle: 'Select the aesthetic that best represents you.'      },
    1: { title: 'Choose your body type',  subtitle: 'Select the silhouette that best fits your body.'     },
    2: { title: 'Pick your favorite brands', subtitle: 'Select the brands you love or aspire to wear.'   },
    3: { title: 'Your preferences',       subtitle: 'Help us personalise recommendations for you.'        },
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-8">

      {/* Progress bar */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={i <= step ? 'text-foreground font-medium' : ''}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      {/* Step heading */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {headings[step].title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {headings[step].subtitle}
        </p>
      </div>

      {/* Step content */}
      {step === 0 && (
        <StyleStep
          selected={selection.styleIds}
          onSelect={ids => setSelection(s => ({ ...s, styleIds: ids }))}
        />
      )}
      {step === 1 && (
        <BodyTypeStep
          selected={selection.bodyTypeId}
          onSelect={id => setSelection(s => ({ ...s, bodyTypeId: id }))}
        />
      )}
      {step === 2 && (
        <BrandStep
          selected={selection.brandIds}
          onSelect={ids => setSelection(s => ({ ...s, brandIds: ids }))}
        />
      )}
      {step === 3 && (
        <PreferencesStep
          value={selection.preferences}
          onChange={prefs => setSelection(s => ({ ...s, preferences: prefs }))}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep(s => (s - 1) as StepIndex)}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={!canContinue}
          onClick={handleNext}
        >
          {isLastStep ? 'Finish' : 'Continue'}
        </Button>
      </div>

    </div>
  )
}
