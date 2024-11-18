import React, { useState, useEffect } from "react";
import AddPlayerForm from "./AddPlayerForm"; // Ensure AddPlayerForm is imported correctly
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]); // State for the list of players
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for errors

  // Fetch players data when the component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("https://basketball-junkie-backend.onrender.com/api/players");
        setPlayers(response.data); // Set the players data
      } catch (err) {
        setError("Error fetching player data");
        console.error("Error fetching player data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <p>Loading players...</p>; // Loading state
  }

  if (error) {
    return <p>{error}</p>; // Error state
  }

  return (
    <div className="players-container">
      <h1>Players</h1>

      {/* Add Player Form */}
      {/* Pass the current players list and setPlayers function to the form */}
      <AddPlayerForm setPlayers={setPlayers} players={players} />

      <div className="players-list">
        {players.length > 0 ? (
          players.map((player) => (
            <div key={player.name} className="player-card">
              {player.image && (
                <img
                  src={`https://basketball-junkie-backend.onrender.com/images/${player.image}`}
                  alt={player.name}
                  className="player-image"
                />
              )}
              <h2>{player.name}</h2>
              <p>Team: {player.team}</p>
              <p>Points: {player.points}</p>
              <p>Assists: {player.assists}</p>
              <p>Rebounds: {player.rebounds}</p>
              <p>Field Goal Percentage: {player.fieldGoalPercentage}%</p>
              <p>3-Point Percentage: {player.threePointPercentage}%</p>
            </div>
          ))
        ) : (
          <p>No players available</p>
        )}
      </div>
    </div>
  );
};

export default Players;
