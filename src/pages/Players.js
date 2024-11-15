import React, { useState, useEffect } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // State to hold the selected player's data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://basketball-junkie-backend.onrender.com/players'); // Update the URL to fetch from the correct endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data); // Store players data in the state
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching players');
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array to run once when the component mounts

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player); // Set the clicked player’s data
  };

  return (
    <div>
      <h1>Players</h1>
      {error && <p>{error}</p>} {/* Display error message if fetch fails */}
      {players.length === 0 ? (
        <p>No players found.</p> // Display message if no players
      ) : (
        <div>
          <h2>Click on a player to view their stats:</h2>
          <ul>
            {players.map(player => (
              <li key={player.id}>
                <button onClick={() => handlePlayerClick(player)}>
                  {player.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Display selected player's details */}
          {selectedPlayer && (
            <div>
              <h3>Player Details</h3>
              <p><strong>Name:</strong> {selectedPlayer.name}</p>
              <p><strong>Team:</strong> {selectedPlayer.team}</p>
              <p><strong>Points per Game:</strong> {selectedPlayer.points}</p>
              <p><strong>Assists per Game:</strong> {selectedPlayer.assists}</p>
              <p><strong>Rebounds per Game:</strong> {selectedPlayer.rebounds}</p>
              <p><strong>Field Goal Percentage:</strong> {selectedPlayer.fieldGoalPercentage}%</p>
              <p><strong>3-Point Percentage:</strong> {selectedPlayer.threePointPercentage}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Players;
