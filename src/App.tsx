import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import LeaguePage from "./pages/League";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/league/:leagueId" element={<LeaguePage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
