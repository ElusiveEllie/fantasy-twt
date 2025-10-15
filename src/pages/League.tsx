import { getLeagueById } from "../services/leagues";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User, League } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { checkLeagueMembership } from "../services/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorCard from "../components/ErrorCard";

function LeaguePage () {
  const { leagueId } = useParams();
  const [league, setLeague] = useState<League | null>(null);
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
    return <ErrorCard error={error} onRetry={() => window.location.reload()}/>
  }

  if (loading) {
    return <LoadingSpinner message="Loading Dashboard..." subMessage={`Gathering your leagues`}/>
  }

  return (
    <div>
      
      <h1>League stuff!</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {"League " + leagueId}
    </div>
    </div>
  )

}


export default LeaguePage;