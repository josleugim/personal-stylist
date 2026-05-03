import { api } from './client'
import { token } from '../lib/token'
import type { LoginRequest, AuthResponse, SignupRequest } from '../types/auth'
import type { User } from '../types/user'

export const authApi = {
  login:  (credentials: LoginRequest) => api.post<AuthResponse>('/auth/login', credentials),
  signup: (data: SignupRequest)       => api.post<User>('/auth/signup', data),
  logout: ()                          => api.post<void>('/auth/logout', {}),
  me:     ()                          => {
    const id = token.getUserId()
    if (!id) return Promise.reject(new Error('No user ID in storage'))
    return api.get<User>(`/users/${id}`)
  },
}
