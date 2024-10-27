// src/pages/Analysis.js
import React from 'react';
import './Analysis.css';

function Analysis() {
  return (
    <section id="analysis" className="layered-section">
      <div className="section-content">
        <h2>Team Stats from Last Season</h2>
        <p>Below are the performance stats of 25 NBA teams from the last season:</p>
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>ORTG</th>
              <th>GP</th>
              <th>PPG</th>
              <th>RPG</th>
              <th>APG</th>
              <th>FG%</th>
              <th>3P%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Mavericks</td><td>108.7</td><td>82</td><td>103.9</td><td>42.6</td><td>22.6</td><td>46.1%</td><td>35.6%</td></tr>
            <tr><td>Lakers</td><td>108.4</td><td>82</td><td>106.9</td><td>44.3</td><td>25.0</td><td>47.6%</td><td>34.6%</td></tr>
            {/* Add more team stats */}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Analysis;
