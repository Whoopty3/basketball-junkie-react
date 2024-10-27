// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  const toggleMenu = () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
  };

  return (
    <header>
      <div className="logo">
        <img src="/images/basketball.jpg" alt="Basketball Junkie Logo" />
        <h1>Basketball Junkie</h1>
      </div>
      <div className="iframe-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/zTBrCP0kBeU?si=vQwPydSgcrVE8lHC"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <nav>
        <span className="hamburger" onClick={toggleMenu}>
          &#9776;
        </span>
        <ul id="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/players">Player Profiles</a></li>
          <li><a href="/teams">Teams</a></li>
          <li><a href="/analysis">Analysis</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
