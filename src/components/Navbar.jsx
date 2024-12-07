import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';  // Ensure styles are being imported

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu open/close
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <h1>Basketball Junkie</h1>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/analysis">Analysis</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/contact-form">Contact Form</Link></li>

        {/* Link to PlayerForm for adding/editing players */}
        <li><Link to="/player-form">Add/Edit Player</Link></li>

        {/* Link to PlayerList for viewing the player list */}
        <li><Link to="/player-list">Player List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
