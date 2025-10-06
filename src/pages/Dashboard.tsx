import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { User, League } from '../types';
import { getUserById } from '../services/users';
import { getLeagueById } from '../services/leagues';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userIdNum = parseInt(userId || '');
        console.log('userId from URL:', userId);
        console.log('userIdNum:', userIdNum);
        console.log('isNaN check:', isNaN(userIdNum));
        if (isNaN(userIdNum)) {
          throw new Error('Invalid user ID');
        }
        const userData = await getUserById(userIdNum);
        if (!userData) {
          throw new Error('User not found');
        }
        setUser(userData);
        const leaguesData = (await Promise.all(
          userData.leagues.map(id => getLeagueById(id))
        )).filter(league => league !== null) as League[];
        setLeagues(leaguesData);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId])

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