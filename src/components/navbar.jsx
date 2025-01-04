import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [aboutDropdown, setAboutDropdown] = useState(false);

  // Show Dropdown
  const showDropdown = () => setAboutDropdown(true);

  // Hide Dropdown
  const hideDropdown = () => setAboutDropdown(false);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Classes">Classes</Link></li>

        {/* About Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
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
      </ul>
    </nav>
  );
};

export default Navbar;
