import { getLeagueById } from "../services/leagues";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User, League } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { checkLeagueMembership } from "../services/auth";

function LeaguePage () {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const { logout, currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      console.log("No current user, redirecting home")
      navigate('/')
    }
  }, [currentUser, isLoading, navigate])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return
      if (!leagueId) return

      const foundLeague = await getLeagueById(Number(leagueId))
      const inLeague = await checkLeagueMembership(currentUser.id, Number(leagueId))
      if (!foundLeague || !inLeague) {
        navigate('/dashboard')
        return
      }

      try {
        setLoading(true);
        setUser(currentUser);
        setLeague(foundLeague);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentUser, leagueId])

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
      <h1>League stuff!</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {"League " + leagueId}
    </div>
    </div>
  )

}


export default LeaguePage;