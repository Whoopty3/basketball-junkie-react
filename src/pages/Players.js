import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch players data when the component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Replace with your deployed backend API
        const response = await axios.get("https://basketball-junkie-backend.onrender.com/api/players");
        setPlayers(response.data);  // Set players data
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
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="players-container">
      <h1>Players</h1>
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
