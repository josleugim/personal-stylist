import { api } from "./client"
import type { OutfitSuggestion } from "../types/outfit_suggestion"

export const outfitSuggestionsApi = {
    getAllByProfileId: (profileId: number) => api.get<OutfitSuggestion[]>(`/outfit-suggestions/${profileId}`),
}