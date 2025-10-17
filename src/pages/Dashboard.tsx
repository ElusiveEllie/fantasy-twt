import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorCard from "../components/ErrorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { getLeagueById } from "../services/leaguesImport";
import type { League, User } from "../types";

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        setUser(currentUser);
        const leaguesData = (
          await Promise.all(currentUser.leagues.map((id) => getLeagueById(id)))
        ).filter((league) => league !== null) as League[];
        setLeagues(leaguesData);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (error) {
    return <ErrorCard error={error} onRetry={() => window.location.reload()} />;
  }

  if (loading) {
    return (
      <LoadingSpinner
        message="Entering the Arena..."
        subMessage="Preparing for battle"
      />
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="text-cyan-400">Dashboard</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Welcome back,{" "}
          <span className="text-cyan-400 font-medium">{user?.name}</span>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your Leagues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map((league) => (
            <div
              key={league.id}
              className="bg-gray-700 border-2 border-cyan-400/50 rounded-lg p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/25 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {league.name}
              </h3>

              <Link
                to={`/league/${league.id}`}
                className="block w-full bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 text-center"
              >
                View League
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
