import { useEffect, useState } from 'react'
import { bodyTypesApi } from '@/api/bodyTypes'
import type { BodyType } from '@/types/bodyType'

interface Props {
  selected: number | null
  onSelect: (id: number) => void
}

export function BodyTypeStep({ selected, onSelect }: Props) {
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    bodyTypesApi.getAll()
      .then(setBodyTypes)
      .catch(() => setError('Failed to load body types'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading body types…</p>
  if (error)   return <p className="text-sm text-destructive">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {bodyTypes.map(bt => (
        <button
          key={bt.id}
          type="button"
          onClick={() => onSelect(bt.id)}
          className={`text-left rounded-xl border p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            selected === bt.id
              ? 'border-foreground bg-muted'
              : 'border-border bg-card hover:bg-muted/50'
          }`}
        >
          <p className="text-sm font-medium text-foreground">{bt.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{bt.description}</p>
        </button>
      ))}
    </div>
  )
}
