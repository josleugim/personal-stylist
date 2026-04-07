import { api } from './client'
import type { LoginRequest } from '../types/auth'
import type { User } from '../types/user'

export const authApi = {
  login:  (credentials: LoginRequest) => api.post<void>('/auth/login', credentials),
  logout: ()                          => api.post<void>('/auth/logout', {}),
  me:     ()                          => api.get<User>('/auth/me'),
}
