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

        console.log('API response:', result); // Debugging the response

        // Enhanced logic to handle unexpected data
        if (result.success && Array.isArray(result.data)) {
          setPlayers(result.data);
        } else if (Array.isArray(result)) {
          // If response itself is an array
          setPlayers(result);
        } else {
          throw new Error('Unexpected API response format. Expected an array or object with a data array.');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        setErrorMessage('Failed to load players. Please try again later.');
      }
    };

    fetchPlayers();
  }, []);

  // Safeguard against non-array data
  const isPlayerDataValid = Array.isArray(players);

  return (
    <div>
      <h1>Player List</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isPlayerDataValid && players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player._id}>
              <strong>{player.name}</strong> - {player.team} ({player.position})
              <p>Points per Game: {player.points_per_game}</p>
              <p>Assists per Game: {player.assists_per_game}</p>
              <p>Rebounds per Game: {player.rebounds_per_game}</p>
              <p>Field Goal %: {player.field_goal_percentage}</p>
              <p>3-Point %: {player.three_point_percentage}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{isPlayerDataValid ? 'No players found.' : 'Invalid player data received. Please try again later.'}</p>
      )}
    </div>
  );
};

export default PlayerList;
