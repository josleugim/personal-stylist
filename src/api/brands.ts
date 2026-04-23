import { api } from './client'
import type { Brand } from '../types/brand'

export const brandsApi = {
  getAll: () => api.get<Brand[]>('/brands'),
}
