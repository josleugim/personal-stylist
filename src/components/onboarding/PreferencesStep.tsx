import { useState, useRef } from 'react'
import type { LogoTolerance } from '@/types/profile'

const HOBBIES_OPTIONS = ['Travel', 'Gaming']
const SPORTS_OPTIONS  = ['Mountain Biking', 'Swimming', 'Running']

export interface Preferences {
  favoriteColors: string[]
  colorsToAvoid:  string[]
  budget:         'low' | 'medium' | 'high' | null
  logoTolerance:  LogoTolerance | null
  location:       string
  fitNotes:       string
  hobbies: string[]
  sports: string[]
  age:    number | null
  height: number | null
}

interface Props {
  value:    Preferences
  onChange: (value: Preferences) => void
}

const BUDGET_OPTIONS: { label: string; value: 'low' | 'medium' | 'high' }[] = [
  { label: 'Low',    value: 'low'    },
  { label: 'Medium', value: 'medium' },
  { label: 'High',   value: 'high'   },
]

const LOGO_OPTIONS: { label: string; value: LogoTolerance }[] = [
  { label: 'None',     value: 'none'     },
  { label: 'Minimal',  value: 'low'  },
  { label: 'Moderate', value: 'medium' },
  { label: 'High',      value: 'high' },
]

function chipClass(active: boolean) {
  return `px-4 py-2 rounded-lg border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
    active
      ? 'border-foreground bg-muted text-foreground'
      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
  }`
}

function ColorTagInput({
  label,
  tags,
  onAdd,
  onRemove,
}: {
  label:    string
  tags:     string[]
  onAdd:    (color: string) => void
  onRemove: (color: string) => void
}) {
  const [input, setInput] = useState('')
  const inputRef          = useRef<HTMLInputElement>(null)

  function commit() {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed)
    }
    setInput('')
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>

      <div className="flex flex-wrap gap-1.5 min-h-9 p-2 rounded-lg border border-border bg-card">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="text-muted-foreground hover:text-foreground leading-none"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); commit() }
            if (e.key === ',' )    { e.preventDefault(); commit() }
          }}
          placeholder={tags.length === 0 ? 'Type a color and press Enter' : 'Add another…'}
          className="flex-1 min-w-24 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>
    </div>
  )
}

function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label:    string
  options:  string[]
  selected: string[]
  onToggle: (option: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="w-full flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <span className={selected.length === 0 ? 'text-muted-foreground' : ''}>
            {selected.length === 0 ? `Select ${label.toLowerCase()}…` : selected.join(', ')}
          </span>
          <svg
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card shadow-md">
            {options.map(opt => (
              <label
                key={opt}
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => onToggle(opt)}
                  className="accent-foreground"
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

type RequiredField = 'budget' | 'location' | 'age' | 'height'

export function PreferencesStep({ value, onChange }: Props) {
  const [touched, setTouched] = useState<Partial<Record<RequiredField, boolean>>>({})

  function touch(field: RequiredField) {
    setTouched(t => ({ ...t, [field]: true }))
  }

  const errors: Partial<Record<RequiredField, string>> = {
    budget:   touched.budget   && value.budget === null         ? 'Budget is required'   : undefined,
    location: touched.location && value.location.trim() === ''  ? 'Location is required' : undefined,
    age:      touched.age      && value.age === null             ? 'Age is required'      : undefined,
    height:   touched.height   && value.height === null          ? 'Height is required'   : undefined,
  }

  function set<K extends keyof Preferences>(key: K, val: Preferences[K]) {
    onChange({ ...value, [key]: val })
  }

  function toggleArrayItem(field: 'hobbies' | 'sports', item: string) {
    const current = value[field]
    set(field, current.includes(item) ? current.filter(i => i !== item) : [...current, item])
  }

  function addColor(field: 'favoriteColors' | 'colorsToAvoid', color: string) {
    set(field, [...value[field], color])
  }

  function removeColor(field: 'favoriteColors' | 'colorsToAvoid', color: string) {
    set(field, value[field].filter(c => c !== color))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Favorite colors */}
      <ColorTagInput
        label="Favorite colors"
        tags={value.favoriteColors}
        onAdd={c    => addColor('favoriteColors', c)}
        onRemove={c => removeColor('favoriteColors', c)}
      />

      {/* Colors to avoid */}
      <ColorTagInput
        label="Colors to avoid"
        tags={value.colorsToAvoid}
        onAdd={c    => addColor('colorsToAvoid', c)}
        onRemove={c => removeColor('colorsToAvoid', c)}
      />

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Budget <span className="text-[11px] text-red-500 font-normal">Required</span>
        </label>
        <div className="flex gap-2" onBlur={() => touch('budget')}>
          {BUDGET_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('budget', opt.value)}
              className={chipClass(value.budget === opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.budget && <p className="text-xs text-purple-500">{errors.budget}</p>}
      </div>

      {/* Logo tolerance */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Logo tolerance</label>
        <div className="flex flex-wrap gap-2">
          {LOGO_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('logoTolerance', opt.value)}
              className={chipClass(value.logoTolerance === opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pref-location" className="text-sm font-medium text-foreground">
          Location <span className="text-muted-foreground font-normal">(country)</span>{' '}
          <span className="text-[11px] text-red-500 font-normal">Required</span>
        </label>
        <input
          id="pref-location"
          type="text"
          value={value.location}
          onChange={e => set('location', e.target.value)}
          onBlur={() => touch('location')}
          placeholder="e.g. Mexico, United States…"
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        {errors.location && <p className="text-xs text-purple-500">{errors.location}</p>}
      </div>

      {/* Fit notes */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pref-fit-notes" className="text-sm font-medium text-foreground">
          Fit notes
        </label>
        <textarea
          id="pref-fit-notes"
          value={value.fitNotes}
          onChange={e => set('fitNotes', e.target.value)}
          placeholder="Describe any fit preferences or body considerations…"
          rows={3}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50 resize-none"
        />
      </div>

      {/* Age */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pref-age" className="text-sm font-medium text-foreground">
          Age <span className="text-[11px] text-red-500 font-normal">Required</span>
        </label>
        <select
          id="pref-age"
          value={value.age ?? ''}
          onChange={e => set('age', e.target.value === '' ? null : Number(e.target.value))}
          onBlur={() => touch('age')}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <option value="">Select age…</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        {errors.age && <p className="text-xs text-purple-500">{errors.age}</p>}
      </div>

      {/* Height */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pref-height" className="text-sm font-medium text-foreground">
          Height <span className="text-muted-foreground font-normal">(cm)</span>{' '}
          <span className="text-[11px] text-red-500 font-normal">Required</span>
        </label>
        <input
          id="pref-height"
          type="number"
          value={value.height ?? ''}
          onChange={e => set('height', e.target.value === '' ? null : Number(e.target.value))}
          onBlur={() => touch('height')}
          placeholder="e.g. 175"
          min={0}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        {errors.height && <p className="text-xs text-purple-500">{errors.height}</p>}
      </div>

      {/* Hobbies */}
      <MultiSelectDropdown
        label="Hobbies"
        options={HOBBIES_OPTIONS}
        selected={value.hobbies}
        onToggle={item => toggleArrayItem('hobbies', item)}
      />

      {/* Sports */}
      <MultiSelectDropdown
        label="Sports"
        options={SPORTS_OPTIONS}
        selected={value.sports}
        onToggle={item => toggleArrayItem('sports', item)}
      />

    </div>
  )
}
