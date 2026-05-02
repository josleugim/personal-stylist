import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { wardrobesApi } from '../api/wardrobes'
import type { Wardrobe } from '../types/wardrobe'

const PAGE_SIZE = 12

export function WardrobePage() {
  const { user } = useAuth()
  const profileId = user?.profile?.id

  const [items, setItems]       = useState<Wardrobe[]>([])
  const [page, setPage]         = useState(1)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!profileId) return
    setLoading(true)
    wardrobesApi.getByProfile(profileId)
      .then(setItems)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [profileId])

  async function handleDelete(id: string) {
    if (!profileId) return
    setDeletingId(id)
    try {
      await wardrobesApi.remove(id, profileId)
      setItems(prev => {
        const next = prev.filter(item => item.id !== id)
        const maxPage = Math.max(1, Math.ceil(next.length / PAGE_SIZE))
        if (page > maxPage) setPage(maxPage)
        return next
      })
    } catch (err) {
      console.error('Failed to delete wardrobe item', err)
    } finally {
      setDeletingId(null)
    }
  }

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const pageItems  = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64 text-gray-500">
        Loading wardrobe…
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Wardrobe</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-16">Your wardrobe is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pageItems.map(item => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.brand ?? item.name ?? 'Wardrobe item'}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>

                <div className="px-3 py-2 flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-700 truncate">
                    {item.brand ?? '—'}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="shrink-0 text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
                    aria-label={`Delete ${item.brand ?? 'item'}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
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
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
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
    </div>
  )
}
