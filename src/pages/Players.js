import React, { useState, useEffect } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch the players data
    fetch("/players.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return (
    <div>
      <h1>Players</h1>
      {players.length === 0 ? (
        <p>Loading players...</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <h3>{player.name}</h3>
              <p><strong>Team:</strong> {player.team}</p>
              <p><strong>Position:</strong> {player.position}</p>
              <p><strong>Points per game:</strong> {player.points}</p>
              <p><strong>Assists per game:</strong> {player.assists}</p>
              <p><strong>Rebounds per game:</strong> {player.rebounds}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Players;
