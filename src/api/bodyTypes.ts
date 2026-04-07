import { api } from './client'
import type { BodyType } from '../types/bodyType'

export const bodyTypesApi = {
  getAll:  () => api.get<BodyType[]>('/body-types'),
  getById: (id: number) => api.get<BodyType>(`/body-types/${id}`),
}
