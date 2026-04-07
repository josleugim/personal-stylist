export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  is_active: boolean
  created_at: string
}

export interface UserCreate {
  email: string
  password: string
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  is_active?: boolean
}
