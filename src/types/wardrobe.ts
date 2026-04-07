export type WardrobeCategory = 'top' | 'bottom' | 'shoes' | 'accessory' | 'outerwear' | 'bag'
export type WardrobePattern = 'solid' | 'striped' | 'plaid' | 'floral' | 'graphic'
export type WardrobeSeason = 'spring' | 'summer' | 'fall' | 'winter'
export type WardrobeOccasion = 'office' | 'casual' | 'formal' | 'sport'

export interface Wardrobe {
  id: string                          // UUID
  profile_id: number

  // Image storage
  image_filename: string
  image_url: string
  thumbnail_url: string | null

  // Classification
  category: WardrobeCategory | null
  subcategory: string | null

  // Attributes
  color: string[] | null
  pattern: WardrobePattern | null
  style_tags: string[] | null
  occasion_tags: WardrobeOccasion[] | null
  season: WardrobeSeason[] | null
  fabric: string | null

  // Brand & product info
  brand: string | null
  name: string | null
  notes: string | null

  // Status & usage
  is_active: boolean
  is_favorite: boolean
  times_worn: number
  last_worn_at: string | null

  // AI-generated metadata
  ai_description: string | null
  ai_attributes: Record<string, unknown> | null

  // Timestamps
  created_at: string
  updated_at: string
}

export interface WardrobeCreate {
  profile_id: number
  image_filename: string
  image_url: string
  thumbnail_url?: string
  category?: WardrobeCategory
  subcategory?: string
  color?: string[]
  pattern?: WardrobePattern
  style_tags?: string[]
  occasion_tags?: WardrobeOccasion[]
  season?: WardrobeSeason[]
  fabric?: string
  brand?: string
  name?: string
  notes?: string
}

export interface WardrobeUpdate {
  category?: WardrobeCategory
  subcategory?: string
  color?: string[]
  pattern?: WardrobePattern
  style_tags?: string[]
  occasion_tags?: WardrobeOccasion[]
  season?: WardrobeSeason[]
  fabric?: string
  brand?: string
  name?: string
  notes?: string
  is_active?: boolean
  is_favorite?: boolean
  times_worn?: number
  last_worn_at?: string
}
