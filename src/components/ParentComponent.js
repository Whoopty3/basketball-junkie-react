import React, { useState } from "react";
import PlayerForm from "./PlayerForm";

const ParentComponent = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return (
    <div>
      <PlayerForm
        setPlayers={setPlayers}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
      {/* Render list of players */}
      <div>
        {players.map((player) => (
          <div key={player._id}>
            <h3>{player.name}</h3>
            <button onClick={() => setCurrentPlayer(player)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentComponent;
