import { api } from './client'
import type { User, UserCreate, UserUpdate } from '../types/user'

export const usersApi = {
  getAll:    ()                        => api.get<User[]>('/users'),
  getById:   (id: number)              => api.get<User>(`/users/${id}`),
  create:    (body: UserCreate)        => api.post<User>('/users', body),
  update:    (id: number, body: UserUpdate) => api.put<User>(`/users/${id}`, body),
  remove:    (id: number)              => api.del<void>(`/users/${id}`),
}
