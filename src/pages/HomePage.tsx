import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../components/ErrorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { getAllUsers } from "../services/users";
import type { User } from "../types";

function HomePage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <ErrorCard error={error} onRetry={() => window.location.reload()} />;
  }

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading Fighters..."
        subMessage="Preparing the arena"
      />
    );
  }

  return (
    <div className="m-0 w-full pt-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            Choose Your Fighter
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-700 border-2 border-cyan-400/50 rounded-lg p-6 text-center hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/25 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {user.name}
              </h3>
              <button
                onClick={() => {
                  login(user);
                  navigate(`/dashboard`);
                }}
                className="w-full bg-gray-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-400 hover:shadow-lg transition-all duration-200"
              >
                Select Fighter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
