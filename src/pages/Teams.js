// src/pages/Teams.js
import React from 'react';
import './Teams.css';

function Teams() {
  return (
    <section id="teams" className="layered-section">
      <div className="section-content">
        <h2>NBA Teams</h2>
        <img src="/images/Teams-small.jpg" alt="NBA Teams" />
        
        <h3>Eastern Conference</h3>
        <ul>
          <li><strong>Atlanta Hawks:</strong> Known for their fast pace and shooting skills.</li>
          <li><strong>Boston Celtics:</strong> A historically dominant team with a strong defensive lineup.</li>
          <li><strong>Brooklyn Nets:</strong> A team powered by star players and a dynamic offense.</li>
          <li><strong>Charlotte Hornets:</strong> Young and talented roster with potential for the future.</li>
          <li><strong>Chicago Bulls:</strong> A legacy of winning championships, rebuilding for success.</li>
          <li><strong>Cleveland Cavaliers:</strong> Known for their star-studded roster in the past, now developing.</li>
          <li><strong>Detroit Pistons:</strong> Building around a core of young and talented players.</li>
          <li><strong>Indiana Pacers:</strong> Consistently competitive, focusing on defense and teamwork.</li>
          <li><strong>Miami Heat:</strong> Known for their "Heat Culture" and hardworking roster.</li>
          <li><strong>Milwaukee Bucks:</strong> With Giannis Antetokounmpo leading the charge, they are strong contenders.</li>
          <li><strong>New York Knicks:</strong> A storied franchise aiming for resurgence in the league.</li>
          <li><strong>Orlando Magic:</strong> Focused on developing young talent for the future.</li>
          <li><strong>Philadelphia 76ers:</strong> With MVP-caliber players, they are a top contender in the East.</li>
          <li><strong>Toronto Raptors:</strong> Known for their excellent development system and recent championship success.</li>
          <li><strong>Washington Wizards:</strong> A rebuilding team looking to develop new talent.</li>
        </ul>

        <h3>Western Conference</h3>
        <ul>
          <li><strong>Dallas Mavericks:</strong> Led by superstar Luka Dončić, they are offensive juggernauts.</li>
          <li><strong>Denver Nuggets:</strong> The reigning NBA champions with a focus on team play and defense.</li>
          <li><strong>Golden State Warriors:</strong> Known for their incredible shooting and ball movement.</li>
          <li><strong>Houston Rockets:</strong> A young team looking to develop its new talent.</li>
          <li><strong>Los Angeles Clippers:</strong> A strong roster with championship aspirations, led by Kawhi Leonard.</li>
          <li><strong>Los Angeles Lakers:</strong> With LeBron James leading the way, they are perennial contenders.</li>
          <li><strong>Memphis Grizzlies:</strong> A young, up-and-coming team built around defense and teamwork.</li>
          <li><strong>Minnesota Timberwolves:</strong> A talented team looking to break through in the tough West.</li>
          <li><strong>New Orleans Pelicans:</strong> Building around Zion Williamson and a deep roster.</li>
          <li><strong>Oklahoma City Thunder:</strong> A team in rebuild mode, developing young stars for the future.</li>
          <li><strong>Phoenix Suns:</strong> A powerful team with a strong offensive focus, led by stars like Kevin Durant.</li>
          <li><strong>Portland Trail Blazers:</strong> A team in transition, but still capable of competing in the West.</li>
          <li><strong>Sacramento Kings:</strong> A young team that has made strides in recent seasons.</li>
          <li><strong>San Antonio Spurs:</strong> Known for their excellent development and coaching, rebuilding around Victor Wembanyama.</li>
          <li><strong>Utah Jazz:</strong> A team with a strong defensive identity, looking to return to contention.</li>
        </ul>
      </div>
    </section>
  );
}

export default Teams;
