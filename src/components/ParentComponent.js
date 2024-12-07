import React, { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm";

const ParentComponent = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch players from backend API
    const fetchPlayers = async () => {
      try {
        const response = await fetch("https://basketball-junkie-backend.onrender.com/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Basketball Players</h1>
      <PlayerForm setPlayers={setPlayers} />
      <ul>
        {players.map((player) => (
          <li key={player._id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
