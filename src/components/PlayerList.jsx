import React, { useEffect, useState } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]); // Default to an empty array
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        // Ensure the response contains a valid array
        if (result.success && Array.isArray(result.data)) {
          setPlayers(result.data); // Set players from the 'data' array
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        setErrorMessage('Failed to load players. Please try again later.');
      }
    };

    fetchPlayers();
  }, []);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <h1>Player List</h1>
      <ul>
        {players.length > 0 ? (
          players.map((player) => (
            <li key={player._id}>
              {player.name} - {player.team} - {player.position}
              <p>Points: {player.points_per_game}</p>
              <p>Assists: {player.assists_per_game}</p>
              <p>Rebounds: {player.rebounds_per_game}</p>
              <p>Field Goal %: {player.field_goal_percentage}</p>
              <p>3-Point %: {player.three_point_percentage}</p>
            </li>
          ))
        ) : (
          <p>No players found.</p>
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
