import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import { token } from '../lib/token'
import type { User } from '../types/user'
import type { LoginRequest } from '../types/auth'

interface AuthState {
  user:        User | null
  isLoading:   boolean
  login:       (credentials: LoginRequest) => Promise<void>
  logout:      () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  // On mount, check if a valid session cookie exists
  useEffect(() => {
    authApi.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(credentials: LoginRequest) {
    const { access_token, refresh_token, user_id } = await authApi.login(credentials)
    token.save(access_token, refresh_token, user_id)
    const me = await authApi.me()
    setUser(me)
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      token.clear()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
