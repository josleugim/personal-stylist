const ACCESS_KEY  = 'access_token'
const REFRESH_KEY = 'refresh_token'
const USER_ID_KEY = 'user_id'

export const token = {
  getAccess:    ()              => localStorage.getItem(ACCESS_KEY),
  getRefresh:   ()              => localStorage.getItem(REFRESH_KEY),
  getUserId:    ()              => {
    const id = localStorage.getItem(USER_ID_KEY)
    return id ? Number(id) : null
  },
  save:         (access: string, refresh: string, userId: number) => {
    localStorage.setItem(ACCESS_KEY,  access)
    localStorage.setItem(REFRESH_KEY, refresh)
    localStorage.setItem(USER_ID_KEY, String(userId))
  },
  clear:        ()              => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_ID_KEY)
  },
  isLoggedIn:   ()              => !!localStorage.getItem(ACCESS_KEY),
}
