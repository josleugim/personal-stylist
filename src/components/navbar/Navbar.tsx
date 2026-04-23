import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <header className="w-screen relative left-1/2 -translate-x-1/2 border-b border-border bg-background">
      <div className="relative flex items-center justify-between px-6 h-16">
        {/* Left spacer — mirrors right nav width for centering */}
        <div className="flex-1" />

        {/* Logo — centered */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-semibold text-foreground text-lg tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-2xl">✦</span>
          <span>StyleAI</span>
        </Link>

        {/* Right nav */}
        <nav className="flex-1 flex items-center justify-end gap-6">
        <Link
            to="/onboarding"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Onboarding
          </Link>
          <Link
            to="/help"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Help
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium px-4 py-1.5 rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium px-4 py-1.5 rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
