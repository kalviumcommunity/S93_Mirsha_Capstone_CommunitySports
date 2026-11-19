
import { useState } from "react";

const API = "http://localhost:3001/api/auth";

function Auth() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (mode === "login") {
        setToken(data.token);

        const profileResponse = await fetch(`${API}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(profileData.message || "Profile verification failed");
        }

        setProfile(profileData.user);
        setMessage("Login and JWT verification successful!");
      } else {
        setMessage("Registration successful! Please login.");
        setMode("login");
        setPassword("");
      }
    } catch (error) {
      setMessage(error.message || "Unable to connect to server.");
      setToken("");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setToken("");
    setProfile(null);
    setPassword("");
    setMessage("Logged out successfully.");
  }

  if (token && profile) {
    return (
      <section className="auth-panel">
        <h2>Welcome, {profile.username}!</h2>
        <p>You are authenticated successfully using JWT.</p>
        <p>{message}</p>
        <button className="primary-btn" onClick={handleLogout}>
          Logout
        </button>
      </section>
    );
  }

  return (
    <section className="auth-panel">
      <h2>{mode === "login" ? "User Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>

      <p>{message}</p>

      <button
        className="secondary-btn"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setMessage("");
        }}
      >
        {mode === "login"
          ? "Create an account"
          : "Already have an account? Login"}
      </button>
    </section>
  );
}

export default Auth;
