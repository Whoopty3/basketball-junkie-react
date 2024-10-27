import React from 'react';
import PlayerCard from '../components/PlayerCard';
import './Players.css';

function Players() {
  const players = [
    { name: 'LeBron James', team: 'Lakers', ppg: 27, apg: 7, rpg: 7.5 },
    { name: 'Stephen Curry', team: 'Warriors', ppg: 30, apg: 6.5, rpg: 5.2 },
    // Add more player data here
  ];

  return (
    <div className="players">
      <h2>Player Profiles</h2>
      <div className="player-list">
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </div>
  );
}

export default Players;
