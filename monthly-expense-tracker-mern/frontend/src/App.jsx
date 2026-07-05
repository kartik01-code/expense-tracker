import { useAuth } from "./context/AuthContext.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="screen-center">
        <div className="loader-card">
          <div className="spinner" />
          <p>Preparing your budget dashboard...</p>
        </div>
      </main>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
}
