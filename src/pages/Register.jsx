import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { getApiErrorMessage } from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {

    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/register", {
        name,
        email,
        password
      });

      setSuccess("Registration successful. You can log in now.");
      setTimeout(() => navigate("/login"), 400);

    } catch (error) {

      setError(getApiErrorMessage(error, "Error registering user"));

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="page">
      <div className="card auth">

      <h2>Register</h2>

      {error && (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert--success" role="status">
          {success}
        </div>
      )}

      <form onSubmit={registerUser}>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <input
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
          autoComplete="new-password"
        />

        <button className="btn" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

      </form>

      <p className="muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>

  );
}

export default Register;