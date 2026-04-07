import { api } from './client'
import type { Style } from '../types/style'

export const stylesApi = {
  getAll:  () => api.get<Style[]>('/styles'),
  getById: (id: number) => api.get<Style>(`/styles/${id}`),
}
