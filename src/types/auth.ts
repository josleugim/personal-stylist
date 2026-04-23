export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  access_token:  string
  refresh_token: string
  token_type:    string
  user_id:       number
}

export interface SignupRequest {
  first_name: string
  last_name:  string
  email:      string
  password:   string
}
