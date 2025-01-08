import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });

      if (response.data && response.data.user) {
        setMessage(`Welcome back, ${response.data.user.username}!`);
        setError(""); // Clear error
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Backend error message
      } else {
        setError("Failed to log in. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div className="digital-class-section">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
