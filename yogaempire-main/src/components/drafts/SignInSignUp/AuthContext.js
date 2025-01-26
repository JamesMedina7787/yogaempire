import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState("");

  // Decode the token and set the user's role whenever `authToken` changes
  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setUserRole(decoded.role); // Extract role from token
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUserRole(""); // Reset role if decoding fails
      }
    } else {
      setUserRole(""); // Clear role if no token
    }
  }, [authToken]);

  // Logout handler: Clear token and role
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUserRole("");
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
