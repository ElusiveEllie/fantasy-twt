import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import LeaguePage from './pages/League'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/league/:leagueId" element={<LeaguePage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
