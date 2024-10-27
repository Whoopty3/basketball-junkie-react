import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Navbar() {
  // State to handle the toggling of the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Basketball Junkie Logo" />
        <h1>Basketball Junkie</h1>
      </div>
      {/* Hamburger icon to toggle the menu */}
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      {/* Menu links, shown or hidden based on isMenuOpen state */}
      <ul id="nav-links" style={{ display: isMenuOpen ? 'block' : 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/players">Player Profiles</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/analysis">Analysis</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><a href="https://whoopty3.github.io/basketball-junkie-react" target="_blank" rel="noopener noreferrer">Main Page</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
