import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"      element={<div>Home page</div>} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected — must be logged in */}
      <Route element={<ProtectedRoute />}>
      </Route>
    </Routes>
  )
}

export default App
