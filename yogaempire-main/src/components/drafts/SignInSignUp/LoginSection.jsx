import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../assets/Register.css"; // Import CSS for styling

const LoginSection = () => {
  const { setToken } = useAuth(); // Use Auth Context
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token
        setToken(data.token); // Update AuthContext
        navigate("/"); // Redirect after login
      } else {
        setMessage(`Error: ${data.error || "Login failed."}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMessage("Error: Could not connect to the server.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>

      {message && (
        <div className={`message-box ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your username"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginSection;
