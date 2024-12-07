import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';  // Make sure the styles are being imported

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
        <li><Link to="/add-player">Add Player</Link></li> {/* Link to add player */}
        {/* Updated link for Edit and Delete with placeholders for dynamic IDs */}
        <li><Link to="/edit-player/1">Edit Player</Link></li> {/* Example static link to edit player with ID 1 */}
        <li><Link to="/delete-player/1">Delete Player</Link></li> {/* Example static link to delete player with ID 1 */}
      </ul>
    </nav>
  );
}

export default Navbar;
