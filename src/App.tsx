import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { WardrobePage } from './pages/Wardrobe'
import { ProtectedRoute } from './components/ProtectedRoute'
import { OnboardingRoute } from './components/OnboardingRoute'
import { Navbar } from './components/navbar/Navbar'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/"          element={<div>Home page</div>} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/signup"    element={<SignupPage />} />
        <Route path="/help"      element={<div>Help page</div>} />

        {/* Protected — must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wardrobe" element={<WardrobePage />} />

          {/* Onboarding — only accessible when profile is not yet created */}
          <Route element={<OnboardingRoute />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
