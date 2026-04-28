import { api } from './client'
import type { SkinTone } from '../types/skin_tone'

export const skinTonesApi = {
  getAll: () => api.get<SkinTone[]>('/skin-tones'),
}
