import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerForm from "./PlayerForm";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        "https://basketball-junkie-backend.onrender.com/api/players"
      );
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://basketball-junkie-backend.onrender.com/api/players/${id}`
      );
      setPlayers(players.filter((player) => player._id !== id));
      setResult("Player successfully deleted!");
    } catch (error) {
      console.error("Error deleting player:", error);
      setResult("Error deleting player");
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleSave = (updatedPlayer) => {
    if (updatedPlayer._id) {
      // Update player in the list
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player._id === updatedPlayer._id ? updatedPlayer : player
        )
      );
    } else {
      // Add new player to the list
      setPlayers((prevPlayers) => [...prevPlayers, updatedPlayer]);
    }
    setEditingPlayer(null);
  };

  const handleCancel = () => {
    setEditingPlayer(null);
  };

  const handleAddNewPlayer = () => {
    setEditingPlayer({
      name: "",
      points_per_game: "",
      assists_per_game: "",
      rebounds_per_game: "",
      field_goal_percentage: "",
      three_point_percentage: "",
      team: "",
      position: "",
      image: null,
    });
  };

  return (
    <div>
      <h1>Player List</h1>
      {editingPlayer ? (
        <PlayerForm
          playerToEdit={editingPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <button onClick={handleAddNewPlayer}>Add New Player</button>
      )}
      <ul>
        {players.map((player) => (
          <li key={player._id} className="player-item">
            <h3>{player.name}</h3>
            <p>
              {player.team} - {player.position}
            </p>
            <p>
              <strong>Stats:</strong> {player.points_per_game} PPG,{" "}
              {player.assists_per_game} APG, {player.rebounds_per_game} RPG
            </p>
            <p>
              <strong>Percentages:</strong> FG%:{" "}
              {player.field_goal_percentage} | 3P%:{" "}
              {player.three_point_percentage}
            </p>
            <button onClick={() => handleEdit(player)}>Edit</button>
            <button onClick={() => handleDelete(player._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {result && <p>{result}</p>}
    </div>
  );
};

export default PlayerList;
