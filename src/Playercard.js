// src/components/PlayerCard.js
import React from 'react';
import './PlayerCard.css';

function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Team: {player.team}</p>
      <p>Points per Game: {player.ppg}</p>
      <p>Assists per Game: {player.apg}</p>
      <p>Rebounds per Game: {player.rpg}</p>
    </div>
  );
}

export default PlayerCard;
