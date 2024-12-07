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
      // Ensure that image URLs are correctly formed
      const playersWithFullImages = response.data.map((player) => ({
        ...player,
        image: player.image
          ? `https://basketball-junkie-backend.onrender.com/images/${player.image}`
          : null, // If no image, keep it as null
      }));
      setPlayers(playersWithFullImages);
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

  const handleSave = async (updatedPlayer) => {
    try {
      let updatedPlayerData = { ...updatedPlayer };

      // If a new image file is selected, handle the image upload logic
      if (updatedPlayer.image && updatedPlayer.image instanceof File) {
        const formData = new FormData();
        formData.append("image", updatedPlayer.image);
        // Send the formData to the backend to upload the image and update the player
        const imageResponse = await axios.post(
          "https://basketball-junkie-backend.onrender.com/api/uploadImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Get the uploaded image URL (assuming the backend returns the image filename)
        updatedPlayerData = { ...updatedPlayer, image: imageResponse.data.imageUrl };
      }

      // Update player data in the backend
      const updateResponse = await axios.put(
        `https://basketball-junkie-backend.onrender.com/api/players/${updatedPlayer._id}`,
        updatedPlayerData
      );

      // After the player is successfully updated, re-fetch the player data
      fetchPlayers();

      // Optionally, reset the editing state or display success message
      setEditingPlayer(null);
      setResult("Player successfully updated!");
    } catch (error) {
      console.error("Error updating player:", error);
      setResult("Error updating player");
    }
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
            {player.image && (
              <img src={player.image} alt={`${player.name}`} width="100" />
            )}
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
