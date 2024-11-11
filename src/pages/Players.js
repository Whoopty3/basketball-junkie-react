import React, { useState, useEffect } from 'react';

// Players Component
const Players = () => {
  const [players, setPlayers] = useState([]); // State to store player data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch player data
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/players');
        
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }

        const data = await response.json(); // Parse the JSON data from the API response
        setPlayers(data); // Update the state with the player data
        setLoading(false); // Set loading to false once data is loaded
      } catch (err) {
        setError(err.message); // Handle any errors that occur during fetching
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchPlayers(); // Call the fetch function when the component is mounted
  }, []); // Empty dependency array means this effect will only run once when the component is mounted

  if (loading) {
    return <div>Loading players...</div>; // Show loading text while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there was an issue fetching data
  }

  return (
    <div id="players-list">
      <h2>NBA Players</h2>
      {players.length === 0 ? (
        <p>No players found</p> // If no players, show this message
      ) : (
        players.map((player) => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p><strong>Points:</strong> {player.points}</p>
            <p><strong>Assists:</strong> {player.assists}</p>
            <p><strong>Rebounds:</strong> {player.rebounds}</p>
            <p><strong>Field Goal %:</strong> {player.fieldGoalPercentage}</p>
            <p><strong>3-Point %:</strong> {player.threePointPercentage}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Players;
