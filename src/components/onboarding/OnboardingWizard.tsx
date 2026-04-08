import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StyleStep } from './StyleStep'
import { BodyTypeStep } from './BodyTypeStep'

const STEPS = ['Style', 'Body Type'] as const
type StepIndex = 0 | 1

interface Selection {
  styleIds:    number[]
  bodyTypeId:  number | null
}

interface Props {
  onComplete: (selection: Selection) => void
}

export function OnboardingWizard({ onComplete }: Props) {
  const [step, setStep]           = useState<StepIndex>(0)
  const [selection, setSelection] = useState<Selection>({ styleIds: [], bodyTypeId: null })

  const progress    = ((step + 1) / STEPS.length) * 100
  const isLastStep  = step === STEPS.length - 1
  const canContinue = step === 0 ? selection.styleIds.length > 0 : selection.bodyTypeId !== null

  function handleNext() {
    if (isLastStep) {
      onComplete(selection)
    } else {
      setStep(s => (s + 1) as StepIndex)
    }
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
          {step === 0 ? 'Choose your style' : 'Choose your body type'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === 0
            ? 'Select the aesthetic that best represents you.'
            : 'Select the silhouette that best fits your body.'}
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
