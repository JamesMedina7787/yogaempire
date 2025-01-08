import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to the backend
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        password,
        role,
      });

      if (response.data && response.data.user) {
        setMessage(`User "${response.data.user.username}" registered successfully!`);
        setError(""); // Clear error
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Registration failed:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Backend error message
      } else {
        setError("Failed to register. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div className="digital-class-section">
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
