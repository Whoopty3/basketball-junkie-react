import React, { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm";

const ParentComponent = () => {
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch players from the server
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

  const handleEdit = (player) => {
    setIsEditing(true);
    setCurrentPlayer(player);
  };

  const handleDelete = async (playerId) => {
    try {
      await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${playerId}`, {
        method: "DELETE",
      });
      setPlayers(players.filter((player) => player._id !== playerId));
      setMessage("Player deleted successfully.");
    } catch (error) {
      console.error("Error deleting player:", error);
      setMessage("Failed to delete player.");
    }
  };

  return (
    <div>
      <h1>Player Management</h1>
      {message && <p>{message}</p>}
      <PlayerForm
        player={currentPlayer}
        setPlayers={setPlayers}
        setIsEditing={setIsEditing}
        setMessage={setMessage}
      />
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name} - {player.team}
            <button onClick={() => handleEdit(player)}>Edit</button>
            <button onClick={() => handleDelete(player._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentComponent;
