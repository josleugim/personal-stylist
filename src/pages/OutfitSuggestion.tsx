import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { outfitSuggestionsApi } from '../api/outfitSuggestions'
import type { OutfitSuggestion, OutfitWardrobeItem } from '../types/outfit_suggestion'

const PAGE_SIZE = 5

export function OutfitSuggestionPage() {
  const { user } = useAuth()
  const profileId = user?.profile?.id

  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [page, setPage]               = useState(1)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [lightbox, setLightbox]       = useState<OutfitWardrobeItem | null>(null)

  useEffect(() => {
    if (!profileId) return
    setLoading(true)
    outfitSuggestionsApi.getAllByProfileId(profileId)
      .then(setSuggestions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [profileId])

  const totalPages = Math.max(1, Math.ceil(suggestions.length / PAGE_SIZE))
  const pageItems  = suggestions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 text-gray-500">
        Loading suggestions…
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Outfit Suggestions</h1>

      {suggestions.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No outfit suggestions yet.</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {pageItems.map(suggestion => (
              <div
                key={suggestion.id}
                className="rounded-xl border border-gray-200 bg-white shadow-sm p-4"
              >
                {suggestion.wardrobe_items.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {suggestion.wardrobe_items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setLightbox(item)}
                        className="flex flex-col items-center gap-1 group"
                        aria-label={`View ${item.brand ?? 'item'}`}
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-gray-400 transition-colors">
                          {item.thumbnail_url ? (
                            <img
                              src={item.thumbnail_url}
                              alt={item.brand ?? 'Wardrobe item'}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        {item.brand && (
                          <span className="text-xs text-gray-500 max-w-[80px] truncate">
                            {item.brand}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {suggestion.reply}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-lg w-full mx-4 bg-white rounded-2xl overflow-hidden shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.image_url}
              alt={lightbox.brand ?? 'Wardrobe item'}
              className="w-full object-contain max-h-[70vh]"
            />
            {lightbox.brand && (
              <div className="px-4 py-3 text-sm font-medium text-gray-700 border-t border-gray-100">
                {lightbox.brand}
              </div>
            )}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white text-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
