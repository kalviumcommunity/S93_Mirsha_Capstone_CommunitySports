import { useState } from "react";

function Auth() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:3001/api/auth/${mode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      if (mode === "login") {
        setToken(data.token);
        setMessage("Login successful!");
      } else {
        setMessage("Registration successful! Please login.");
        setMode("login");
      }
    } catch (error) {
      setMessage("Unable to connect to server.");
    }
  }

  if (token) {
    return (
      <section>
        <h2>Welcome, {username}!</h2>
        <p>You are logged in successfully.</p>
        <button onClick={() => setToken("")}>Logout</button>
      </section>
    );
  }

  return (
    <section>
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

        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <p>{message}</p>

      <button
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