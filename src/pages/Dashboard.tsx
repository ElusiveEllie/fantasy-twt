import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User, League } from '../types';
import { getLeagueById } from '../services/leagues';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return

      try {
        setLoading(true);
        setUser(currentUser);
        const leaguesData = (await Promise.all(
          currentUser.leagues.map(id => getLeagueById(id))
        )).filter(league => league !== null) as League[];
        setLeagues(leaguesData);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentUser])

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
      <button 
      onClick={() => {
        logout()
        navigate('/')
      }} 
      style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px',
        padding: '5px 10px'
      }}
    >
      Logout
    </button>
      <h1>Dashboard</h1>
      <p>Current user: {user?.name}</p>
      <h2>Leagues:</h2>
      <ul>
        {leagues.map(league => (
          <li key={league.id}>{league.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard