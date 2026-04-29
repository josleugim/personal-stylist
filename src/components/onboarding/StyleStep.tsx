import { useEffect, useState } from 'react'
import { stylesApi } from '@/api/styles'
import type { Style } from '@/types/style'

interface Props {
  selected: number[]
  onSelect: (ids: number[]) => void
}

export function StyleStep({ selected, onSelect }: Props) {
  const [styles, setStyles]   = useState<Style[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    stylesApi.getAll()
      .then(setStyles)
      .catch(() => setError('Failed to load styles'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading styles…</p>
  if (error)   return <p className="text-sm text-destructive">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {styles.map(style => {
        const isSelected = selected.includes(style.id)
        function toggle() {
          onSelect(isSelected ? selected.filter(id => id !== style.id) : [...selected, style.id])
        }
        return (
        <button
          key={style.id}
          type="button"
          onClick={toggle}
          className={`text-left rounded-xl border p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            isSelected
              ? 'border-foreground bg-muted'
              : 'border-border bg-card hover:bg-muted/50'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-foreground">{style.name}</p>
            <span className="shrink-0 text-xs text-muted-foreground bg-muted rounded-md px-2 py-0.5 border border-border">
              {style.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{style.description}</p>
          {style.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {style.tags?.map(tag => (
                <span key={tag} className="text-xs text-muted-foreground bg-background border border-border rounded-full px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </button>
        )
      })}
    </div>
  )
}
