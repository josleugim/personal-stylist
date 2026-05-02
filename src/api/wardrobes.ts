import { api } from './client'
import type { Wardrobe, WardrobeCreate } from '../types/wardrobe'

export const wardrobesApi = {
  getByProfile: (profileId: number)                    => api.get<Wardrobe[]>(`/wardrobes/${profileId}`),
  create:       (body: WardrobeCreate)                 => api.post<Wardrobe>('/wardrobes', body),
  remove:       (id: string, profileId: number)        => api.del<void>(`/wardrobes/${id}?profile_id=${profileId}`),
}
