import React, { useState } from 'react';
import PlayerForm from './PlayerForm';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div>
      <PlayerForm
        selectedPlayer={selectedPlayer}
        setPlayers={setPlayers} // Passing setPlayers as a prop
        setSelectedPlayer={setSelectedPlayer}
      />
      {/* Display players list */}
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.points} PPG
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
