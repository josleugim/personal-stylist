import { api } from './client';
import type { Profile, ProfileCreate } from '../types/profile';

export const profileApi = {
    create: (body: ProfileCreate) => api.post<Profile>('/profiles', body)
}