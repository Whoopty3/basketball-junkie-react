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

      setEditingPlayer(null);
      setResult("Player successfully updated!");
    } catch (error) {
      console.error("Error updating player:", error);
      setResult("Error updating player");
    }
  };

  const handleCancel = () => {
    setEditingPlayer(null); // Close the form without saving
  };

  return (
    <div>
      <h1>Player List</h1>
      <button onClick={() => setEditingPlayer({})}>Add New Player</button>
      {result && <p>{result}</p>}
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            <div>
              <img
                src={player.image || "default-image-url"}
                alt={player.name}
                width="50"
              />
              <p>{player.name}</p>
              <button onClick={() => handleEdit(player)}>Edit</button>
              <button onClick={() => handleDelete(player._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingPlayer !== null && (
        <PlayerForm
          playerToEdit={editingPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PlayerList;
