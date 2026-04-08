import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { ProtectedRoute } from './components/ProtectedRoute'
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
        <Route path="/help"      element={<div>Help page</div>} />

        {/* Protected — must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
