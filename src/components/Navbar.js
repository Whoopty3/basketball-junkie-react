import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Ensure you have a corresponding CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/basketball.jpg" alt="Basketball Junkie Logo" />
        <h1>Basketball Junkie</h1>
      </div>

      <div className="iframe-container">
        <iframe
          width="280" 
          height="157" 
          src="https://www.youtube.com/embed/zTBrCP0kBeU?si=vQwPydSgcrVE8lHC"
          title="YouTube video player" 
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/players">Player Profiles</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      <span className="hamburger" onClick={toggleMenu}>&#9776;</span> {/* Hamburger menu for mobile view */}
    </nav>
  );
}

// Example toggle function for mobile view
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

export default Navbar;
