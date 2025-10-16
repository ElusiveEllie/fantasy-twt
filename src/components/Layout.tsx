import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Layout({ children }: { children: ReactNode }) {
  const { logout, currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && !isLoading && location.pathname !== "/") {
      console.log("No current user, redirecting home");
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col bg-gradient-to-br from-gray-800 to-gray-900">
      {!isLoading && currentUser && (
        <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-cyan-400/30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 hover:shadow-lg hover:shadow-red-400/25 transition-all duration-200"
            >
              Logout
            </button>
          </div>
          <span className="text-cyan-400 font-medium">
            Logged in as {currentUser?.name}
          </span>
        </header>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default Layout;
