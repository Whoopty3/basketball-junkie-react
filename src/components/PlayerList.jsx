import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://basketball-junkie-backend.onrender.com/api/players";

  // Fetch players from the API
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPlayers(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load players.");
    }
  };

  // Add a new player
  const addPlayer = async (newPlayerData) => {
    try {
      await axios.post(API_URL, newPlayerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPlayers(); // Re-fetch players after adding
    } catch (err) {
      setError("Failed to add player.");
    }
  };

  // Delete a player
  const deletePlayer = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPlayers(); // Re-fetch players after deleting
    } catch (err) {
      setError("Failed to delete player.");
    }
  };

  // Fetch players on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Player List</h1>
      {loading && <p>Loading players...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            <div>
              <img
                src={`https://basketball-junkie-backend.onrender.com/images/${player.main_image}`}
                alt={player.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h2>{player.name}</h2>
              <p>Team: {player.team}</p>
              <p>Position: {player.position}</p>
              <p>Points Per Game: {player.points_per_game}</p>
              <p>Assists Per Game: {player.assists_per_game}</p>
              <p>Rebounds Per Game: {player.rebounds_per_game}</p>
              <button onClick={() => deletePlayer(player._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Form or other components can be added here for adding new players */}
    </div>
  );
};

export default PlayerList;
