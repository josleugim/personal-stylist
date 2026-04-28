import type { User } from './user'
import type { Style } from './style'
import type { BodyType } from './bodyType'
import type { Wardrobe } from './wardrobe'
import type { SkinTone } from './skin_tone'

export type LogoTolerance = 'none' | 'low' | 'medium' | 'high'

export interface Profile {
  id: number
  user_id: number
  user: User
  styles: Style[]
  body_types: BodyType[]
  wardrobes: Wardrobe[]
  skin_tone: SkinTone
  fit_notes: string | null
  favorite_colors: string[] | null
  colors_to_avoid: string[] | null
  budget: string | null
  location: string | null
  logo_tolerance: LogoTolerance | null
  hobbies: string[]
  sports: string[]
  age: number
  height: number
  gender: string
  created_at: string
}

export interface ProfileCreate {
  user_id: number
  style_ids?: number[]
  body_type_ids?: number[]
  skin_tone_id: number
  fit_notes?: string
  favorite_colors?: string[]
  colors_to_avoid?: string[]
  budget?: string
  location?: string
  logo_tolerance?: LogoTolerance
  hobbies: string[]
  sports: string[]
  age: number
  height: number
  gender: string
}

export interface ProfileUpdate {
  fit_notes?: string
  favorite_colors?: string[]
  colors_to_avoid?: string[]
  skin_tone_id: number
  budget?: string
  location?: string
  logo_tolerance?: LogoTolerance
  style_ids?: number[]
  body_type_ids?: number[]
  hobbies: string[]
  sports: string[]
  age: number
  height: number
  gender: string
}
