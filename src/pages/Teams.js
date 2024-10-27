// src/pages/Teams.js
import React from 'react';
import './Teams.css';

function Teams() {
  return (
    <section id="teams" className="layered-section">
      <div className="section-content">
        <h2>NBA Teams</h2>

        <h3>Eastern Conference</h3>
        <ul>
          <li><strong>Atlanta Hawks:</strong> Known for their fast pace and shooting skills...</li>
          <li><strong>Boston Celtics:</strong> A historically dominant team with a strong defensive lineup...</li>
          {/* Add more teams */}
        </ul>

        <h3>Western Conference</h3>
        <ul>
          <li><strong>Dallas Mavericks:</strong> Led by superstar Luka Dončić, they are offensive juggernauts...</li>
          <li><strong>Denver Nuggets:</strong> The reigning NBA champions with a focus on team play and defense...</li>
          {/* Add more teams */}
        </ul>
      </div>
    </section>
  );
}

export default Teams;
