// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Basketball Junkie</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/players">Players</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/analysis">Analysis</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
