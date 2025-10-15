import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../services/users"
import { useState, useEffect } from 'react'
import type { User } from "../types"

function HomePage() {
  const { login, logout, currentUser} = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const usersData = await getAllUsers()
        setUsers(usersData)
      } catch (err: any) {
        setError(err.message || String(err))
      } finally {
        setLoading(false)
      }
    }
    
    fetchUsers()
  }, [])

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      {currentUser && (
        <div>
        <button 
          onClick={() => {
            navigate('/dashboard')
          }} 
          style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px',
            padding: '5px 10px'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => {
            logout()
            navigate('/')
          }} 
          style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '130px',
            padding: '5px 10px'
          }}
        >
          Logout
        </button>
        <span style={{ 
          position: 'absolute', 
          top: '15px', 
          left: '220px', 
          fontSize: '14px',
          color: '#666'
        }}>
          Logged in as {currentUser?.name}
        </span>
      </div>
      )}
      <h1>Choose Your Fighter!</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {users.map(user => (
        <div key={user.id} style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
          <h3>{user.name}</h3>
          <button onClick={() => {
            login(user)
            navigate(`/dashboard`)
          }}>
            Select Fighter
          </button>
        </div>
      ))}
    </div>
    </div>
  )
}

export default HomePage