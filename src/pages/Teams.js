// src/pages/Teams.js
import React from 'react';
import '../styles/Teams.css';

function Teams() {
  const easternConferenceTeams = [
    { name: "Atlanta Hawks", description: "Known for their fast pace and shooting skills." },
    { name: "Boston Celtics", description: "A historically dominant team with a strong defensive lineup." },
    { name: "Brooklyn Nets", description: "A team powered by star players and a dynamic offense." },
    { name: "Charlotte Hornets", description: "Young and talented roster with potential for the future." },
    { name: "Chicago Bulls", description: "A legacy of winning championships, rebuilding for success." },
    { name: "Cleveland Cavaliers", description: "Known for their star-studded roster in the past, now developing." },
    { name: "Detroit Pistons", description: "Building around a core of young and talented players." },
    { name: "Indiana Pacers", description: "Consistently competitive, focusing on defense and teamwork." },
    { name: "Miami Heat", description: "Known for their 'Heat Culture' and hardworking roster." },
    { name: "Milwaukee Bucks", description: "With Giannis Antetokounmpo leading the charge, they are strong contenders." },
    { name: "New York Knicks", description: "A storied franchise aiming for resurgence in the league." },
    { name: "Orlando Magic", description: "Focused on developing young talent for the future." },
    { name: "Philadelphia 76ers", description: "With MVP-caliber players, they are a top contender in the East." },
    { name: "Toronto Raptors", description: "Known for their excellent development system and recent championship success." },
    { name: "Washington Wizards", description: "A rebuilding team looking to develop new talent." },
  ];

  const westernConferenceTeams = [
    { name: "Dallas Mavericks", description: "Led by superstar Luka Dončić, they are offensive juggernauts." },
    { name: "Denver Nuggets", description: "The reigning NBA champions with a focus on team play and defense." },
    { name: "Golden State Warriors", description: "Known for their incredible shooting and ball movement." },
    { name: "Houston Rockets", description: "A young team looking to develop its new talent." },
    { name: "Los Angeles Clippers", description: "A strong roster with championship aspirations, led by Kawhi Leonard." },
    { name: "Los Angeles Lakers", description: "With LeBron James leading the way, they are perennial contenders." },
    { name: "Memphis Grizzlies", description: "A young, up-and-coming team built around defense and teamwork." },
    { name: "Minnesota Timberwolves", description: "A talented team looking to break through in the tough West." },
    { name: "New Orleans Pelicans", description: "Building around Zion Williamson and a deep roster." },
    { name: "Oklahoma City Thunder", description: "A team in rebuild mode, developing young stars for the future." },
    { name: "Phoenix Suns", description: "A powerful team with a strong offensive focus, led by stars like Kevin Durant." },
    { name: "Portland Trail Blazers", description: "A team in transition, but still capable of competing in the West." },
    { name: "Sacramento Kings", description: "A young team that has made strides in recent seasons." },
    { name: "San Antonio Spurs", description: "Known for their excellent development and coaching, rebuilding around Victor Wembanyama." },
    { name: "Utah Jazz", description: "A team with a strong defensive identity, looking to return to contention." },
  ];

  return (
    <section id="teams" className="layered-section">
      <div className="section-content">
        <h2>NBA Teams</h2>
        <img src="/images/Teams-small.jpg" alt="NBA Teams" />

        <h3>Eastern Conference</h3>
        <ul>
          {easternConferenceTeams.map((team, index) => (
            <li key={index}><strong>{team.name}:</strong> {team.description}</li>
          ))}
        </ul>

        <h3>Western Conference</h3>
        <ul>
          {westernConferenceTeams.map((team, index) => (
            <li key={index}><strong>{team.name}:</strong> {team.description}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Teams;
