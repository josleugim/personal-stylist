import { useEffect, useState } from 'react'
import { skinTonesApi } from '@/api/skinTones'
import type { SkinTone } from '@/types/skin_tone'

interface Props {
  selected: number | null
  onSelect: (id: number) => void
}

export function SkinToneStep({ selected, onSelect }: Props) {
  const [skinTones, setSkinTones] = useState<SkinTone[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    skinTonesApi.getAll()
      .then(setSkinTones)
      .catch(() => setError('Failed to load skin tones'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading skin tones…</p>
  if (error)   return <p className="text-sm text-destructive">{error}</p>

  return (
    <div className="grid grid-cols-4 gap-4">
      {skinTones.map(tone => (
        <button
          key={tone.id}
          type="button"
          onClick={() => onSelect(tone.id)}
          className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            selected === tone.id
              ? 'border-foreground bg-muted'
              : 'border-border bg-card hover:bg-muted/50'
          }`}
        >
          <span
            className="w-10 h-10 rounded-full border border-border/40 shadow-sm"
            style={{ backgroundColor: tone.hex }}
          />
          <span className="text-xs text-center text-foreground leading-tight">{tone.name}</span>
        </button>
      ))}
    </div>
  )
}
