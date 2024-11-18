import React, { useState } from 'react';
import '../styles/Home.css';

function Home() {
  // State to hold the list of players
  const [players, setPlayers] = useState([]);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Basketball Junkie</h1>
        <p>Your go-to source for in-depth basketball player analysis, stats, and team insights!</p>
      </header>
      
      <section className="featured-content">
        <h2>Featured Analysis</h2>
        <div className="featured-card">
          <h3>Player of the Week</h3>
          <p>Explore in-depth stats, recent performance highlights, and trends for our featured player of the week.</p>
        </div>
        
        <div className="featured-card">
          <h3>Top Teams</h3>
          <p>Get insights into the top-performing teams this season and understand their winning strategies.</p>
        </div>
        
        <div className="featured-card">
          <h3>Upcoming Games</h3>
          <p>Check out the schedule for upcoming games, key matchups, and players to watch.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
