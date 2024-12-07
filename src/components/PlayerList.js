import React, { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm";

// PlayerList Component
const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [result, setResult] = useState("");

  // Fetch players from the external API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://basketball-junkie-backend.onrender.com/api/players"
        );
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const handleAddNewPlayer = () => {
    setEditingPlayer({});  // Initialize as an empty object for new player
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://basketball-junkie-backend.onrender.com/api/players/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
      setPlayers(players.filter((player) => player.id !== id));
      setResult("Player deleted successfully");
      setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error deleting player:", error);
      setResult("Error deleting player");
      setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
    }
  };

  const handleSave = async (player) => {
    try {
      let response;
      if (player.id) {
        response = await fetch(
          `https://basketball-junkie-backend.onrender.com/api/players/${player.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player),
          }
        );
      } else {
        response = await fetch(
          "https://basketball-junkie-backend.onrender.com/api/players",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(player),
          }
        );
      }

      const text = await response.text(); // Get the response body as text

      if (response.ok) {
        try {
          const savedPlayer = JSON.parse(text); // Try parsing JSON
          if (player.id) {
            setPlayers(players.map((p) => (p.id === savedPlayer.id ? savedPlayer : p)));
          } else {
            setPlayers([...players, savedPlayer]);
          }
          setResult("Player saved successfully");
          setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
          setEditingPlayer(null);
        } catch (e) {
          console.error("Failed to parse JSON:", e, text);
          setResult("Error saving player");
          setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
        }
      } else {
        setResult("Error saving player: " + text);
        setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
      }
    } catch (error) {
      console.error("Error saving player:", error);
      setResult("Error saving player");
      setTimeout(() => setResult(""), 3000); // Clear message after 3 seconds
    }
  };

  const handleCancel = () => {
    setEditingPlayer(null);
  };

  return (
    <div>
      <h1>Player List</h1>
      <button onClick={handleAddNewPlayer}>Add New Player</button>
      {result && <p>{result}</p>}
      <ul>
        {players.map((player) => (
          <li key={player.id}> {/* Ensure 'id' is unique for each player */}
            <div>
              <p>{player.name}</p>
              <button onClick={() => handleEdit(player)}>Edit</button>
              <button onClick={() => handleDelete(player.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingPlayer !== null && (
        <PlayerForm
          playerToEdit={editingPlayer}
          onSave={handleSave}  // Ensure onSave is passed as a function
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PlayerList;
