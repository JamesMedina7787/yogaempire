import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get backend URL from environment variable
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending registration request...");
      
      // Send registration data to the backend
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        { username, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials if using cookies or session-based authentication
        }
      );

      if (response.data && response.data.user) {
        setMessage(`User "${response.data.user.username}" registered successfully!`);
        setError(""); // Clear error
        setUsername(""); // Clear username field
        setPassword(""); // Clear password field
        setRole("user"); // Reset role to default
        console.log("Registration successful:", response.data);
      } else {
        setError("Unexpected response from the server.");
        console.error("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Registration failed:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Backend error message
      } else if (err.request) {
        setError("Failed to connect to the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
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
