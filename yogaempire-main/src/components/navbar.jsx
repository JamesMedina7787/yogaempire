import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./drafts/SignInSignUp/AuthContext";

const Navbar = () => {
  const { userRole, logout } = useContext(AuthContext); // Access role and logout
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  const showAboutDropdown = () => setAboutDropdown(true);
  const hideAboutDropdown = () => setAboutDropdown(false);

  const showAdminDropdown = () => setAdminDropdown(true);
  const hideAdminDropdown = () => setAdminDropdown(false);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>

        {/* About Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={showAboutDropdown}
          onMouseLeave={hideAboutDropdown}
        >
          <span>About</span>
          {aboutDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/about/james">James</Link></li>
              <li><Link to="/about/gia">Gia</Link></li>
              <li><Link to="/about/business">Our Business</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/drafts/Zoom/Zoom">Zoom</Link></li>

        
        {userRole === "admin" && (
          <li
            className="dropdown"
            onMouseEnter={showAdminDropdown}
            onMouseLeave={hideAdminDropdown}
          >
            <span>Admin</span>
            {adminDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/drafts/AdminPanel">AdminPage</Link></li>
              </ul>
            )}
          </li>
        )}

        {/* Logout Button */}
        {userRole && (
          <li>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
