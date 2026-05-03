export interface OutfitWardrobeItem {
    id: string
    brand: string | null
    thumbnail_url: string | null
    image_url: string
}

export interface OutfitSuggestion {
    id: string
    profile_id: number
    reply: string
    wardrobe_items: OutfitWardrobeItem[]
    created_at: string
}