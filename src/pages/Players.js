// src/pages/Players.js
import React from 'react';
import './Players.css';

function Players() {
  return (
    <section id="player-profiles" className="layered-section">
      <div className="section-content">
        <h2>Player Profiles</h2>
        <p>Here are the stats for 25 top NBA players:</p>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Points Per Game (PPG)</th>
              <th>Assists Per Game (APG)</th>
              <th>Rebounds Per Game (RPG)</th>
              <th>Field Goal Percentage (FG%)</th>
              <th>3-Point Percentage (3P%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>LeBron James</td><td>25.7</td><td>7.9</td><td>7.4</td><td>50%</td><td>35%</td></tr>
            <tr><td>Stephen Curry</td><td>29.3</td><td>6.2</td><td>5.5</td><td>47%</td><td>43%</td></tr>
            {/* Add more players here */}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Players;
