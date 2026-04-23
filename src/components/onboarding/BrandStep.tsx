import { useEffect, useState } from 'react'
import { brandsApi } from '@/api/brands'
import type { Brand } from '@/types/brand'

interface Props {
  selected: string[]
  onSelect: (ids: string[]) => void
}

export function BrandStep({ selected, onSelect }: Props) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    brandsApi.getAll()
      .then(setBrands)
      .catch(() => setError('Failed to load brands'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading brands…</p>
  if (error)   return <p className="text-sm text-destructive">{error}</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {brands.map(brand => {
        const isSelected = selected.includes(brand.id)
        function toggle() {
          onSelect(isSelected ? selected.filter(id => id !== brand.id) : [...selected, brand.id])
        }
        return (
          <button
            key={brand.id}
            type="button"
            onClick={toggle}
            className={`text-left rounded-xl border p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
              isSelected
                ? 'border-foreground bg-muted'
                : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{brand.name}</p>
              <span className="shrink-0 text-xs text-muted-foreground bg-muted rounded-md px-2 py-0.5 border border-border">
                {brand.tier}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{brand.category}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs text-muted-foreground bg-background border border-border rounded-full px-2 py-0.5">
                {brand.origin}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
