import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/Register.css"; // Import CSS file

const Register = () => {
  const [formData, setFormData] = useState({ name: "", password: "", role: "client" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // To navigate after registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to:`, value); // Debugging log
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setFormData({ name: "", password: "", role: "client" });
        navigate("/drafts/SignInSignUp/LoginSection"); // Redirect to login
      } else {
        setMessage(`Error: ${data.error || "Registration failed."}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Error: Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {message && (
        <div className={`message-box ${message.startsWith("Success") ? "success" : "error"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
