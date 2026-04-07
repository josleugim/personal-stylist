import { api } from './client'
import type { Wardrobe, WardrobeCreate, WardrobeItem, WardrobeItemCreate } from '../types/wardrobe'

export const wardrobesApi = {
  getAll:      ()                                    => api.get<Wardrobe[]>('/wardrobes'),
  getById:     (id: number)                          => api.get<Wardrobe>(`/wardrobes/${id}`),
  getByUser:   (userId: number)                      => api.get<Wardrobe[]>(`/users/${userId}/wardrobes`),
  create:      (body: WardrobeCreate)                => api.post<Wardrobe>('/wardrobes', body),
  remove:      (id: number)                          => api.del<void>(`/wardrobes/${id}`),
  addItem:     (wardrobeId: number, body: WardrobeItemCreate) =>
                 api.post<WardrobeItem>(`/wardrobes/${wardrobeId}/items`, body),
  removeItem:  (wardrobeId: number, itemId: number)  =>
                 api.del<void>(`/wardrobes/${wardrobeId}/items/${itemId}`),
}
