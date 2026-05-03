import type { Wardrobe } from "./wardrobe"

export interface OutfitSuggestion {
    id: string
    profile_id: number
    reply: string
    wardrobe_items: Wardrobe[]
    created_at: string
}