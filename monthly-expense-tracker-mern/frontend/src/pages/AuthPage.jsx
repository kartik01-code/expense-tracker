import { BadgeIndianRupee, BarChart3, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login({
          email: form.email,
          password: form.password
        });
      } else {
        await register(form);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <div className="hero-badge">
          <Wallet size={18} />
          Personal Finance Dashboard
        </div>

        <h1>Track your money. Control your monthly budget.</h1>

        <p>
          A clean MERN stack expense tracker that helps you monitor spending,
          set budgets, and understand where your money goes.
        </p>

        <div className="hero-cards">
          <div>
            <BadgeIndianRupee />
            <span>Budget Control</span>
          </div>
          <div>
            <BarChart3 />
            <span>Visual Reports</span>
          </div>
          <div>
            <ShieldCheck />
            <span>Private Data</span>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-tabs">
          <button className={isLogin ? "active" : ""} onClick={() => setMode("login")}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setMode("register")}>
            Register
          </button>
        </div>

        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin ? "Continue your budget tracking." : "Start your finance dashboard today."}
        </p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={submitHandler} className="auth-form">
          {!isLogin && (
            <label>
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Abhishek Tomar"
                required
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              minLength="6"
              required
            />
          </label>

          <button className="primary-btn full" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}
