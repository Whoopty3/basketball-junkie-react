import React, { useState, useEffect } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend using the environment variable
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/players`);
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

  return (
    <div>
      <h1>Players</h1>
      {error && <p>{error}</p>}  {/* Display error message if fetch fails */}
      {players.length === 0 ? (
        <p>No players found.</p> // Display message if no players
      ) : (
        <ul>
          {players.map(player => (
            <li key={player.id}>
              {player.name} - {player.team} - {player.points} PPG
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Players;
