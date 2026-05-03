import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { token } from '../lib/token'
import type { AuthResponse } from '../types/auth'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = []

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve()
  )
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const original: InternalAxiosRequestConfig = error.config

    // Don't attempt a refresh for non-401s, already-retried requests,
    // or if the refresh endpoint itself returned 401 (avoid deadlock).
    if (
      error.response?.status !== 401 ||
      original._retry ||
      original.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error)
    }

    // No refresh token means the user is not logged in — don't attempt a
    // refresh; just let the caller handle the rejection (e.g. AuthContext
    // catches it and sets user to null without triggering a redirect).
    if (!token.getRefresh()) return Promise.reject(error)

    if (isRefreshing) {
      // Another refresh is in flight — queue this request.
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then(() => axiosInstance(original))
    }

    original._retry = true
    isRefreshing = true

    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/refresh', {
        refresh_token: token.getRefresh(),
      })
      token.save(data.access_token, data.refresh_token, data.user_id)
      processQueue(null)
      return axiosInstance(original)
    } catch (refreshError) {
      processQueue(refreshError)
      token.clear()
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export const api = {
  get:  <T>(path: string)                => axiosInstance.get<T>(path).then(r => r.data),
  post: <T>(path: string, body: unknown) => axiosInstance.post<T>(path, body).then(r => r.data),
  put:  <T>(path: string, body: unknown) => axiosInstance.put<T>(path, body).then(r => r.data),
  del:  <T>(path: string)                => axiosInstance.delete<T>(path).then(r => r.data),
}
