import { LogOut, WalletCards } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ month, setMonth }) {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">
          <WalletCards size={24} />
        </div>
        <div>
          <h1>Monthly Expense Tracker</h1>
          <p>Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="header-actions">
        <label className="month-picker">
          <span>Month</span>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        </label>

        <button className="ghost-btn" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
