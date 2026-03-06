import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate(from, { replace: true });

    } catch (err) {

      setError(getApiErrorMessage(err, "Invalid credentials"));

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="page">
      <div className="card auth">

      <h2>Login</h2>

      {error && (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="muted">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      </div>
    </div>

  );
}

export default Login;