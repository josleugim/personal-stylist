import type { User } from './user'
import type { Style } from './style'
import type { BodyType } from './bodyType'
import type { Wardrobe } from './wardrobe'

export type LogoTolerance = 'none' | 'low' | 'medium' | 'high'

export interface Profile {
  id: number
  user_id: number
  user: User
  styles: Style[]
  body_types: BodyType[]
  wardrobes: Wardrobe[]
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
  created_at: string
}

export interface ProfileCreate {
  user_id: number
  style_ids?: number[]
  body_type_ids?: number[]
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
}

export interface ProfileUpdate {
  fit_notes?: string
  favorite_colors?: string[]
  colors_to_avoid?: string[]
  budget?: string
  location?: string
  logo_tolerance?: LogoTolerance
  style_ids?: number[]
  body_type_ids?: number[]
  hobbies: string[]
  sports: string[]
  age: number
  height: number
}
