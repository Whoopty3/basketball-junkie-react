import React from 'react';
import './Home.css';

function Home() {
  return (
    <section id="home" className="layered-section">
      <div className="section-image">
        <img src="./images/basketball.jpg" alt="Home" />
      </div>
      <div className="section-content">
        <h2>Welcome to Basketball Junkie</h2>
        <p>Your ultimate source for detailed basketball statistics, player profiles, team insights, and in-depth analysis...</p>
        <h3>Latest News</h3>
        <ul>
          <li><strong>NBA Finals 2024:</strong> Catch up on the final games...</li>
          <li><strong>LeBron James Breaks Records:</strong> An in-depth look...</li>
        </ul>
        <div className="btn-wrapper">
          <a href="/analysis" className="btn">Discover More</a>
        </div>
      </div>
    </section>
  );
}

export default Home;
