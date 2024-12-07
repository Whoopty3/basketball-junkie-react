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

        // Ensure result.data is an array
        if (result && result.success && Array.isArray(result.data)) {
          setPlayers(result.data);
        } else {
          throw new Error('Invalid API response format');
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

  // Manually render the list without directly using map
  const renderPlayers = () => {
    if (!Array.isArray(players) || players.length === 0) {
      return <p>No players found.</p>;
    }

    const playerList = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      playerList.push(
        <li key={player._id}>
          <strong>{player.name}</strong> - {player.team} ({player.position})
          <p>Points per Game: {player.points_per_game}</p>
          <p>Assists per Game: {player.assists_per_game}</p>
          <p>Rebounds per Game: {player.rebounds_per_game}</p>
          <p>Field Goal %: {player.field_goal_percentage}</p>
          <p>3-Point %: {player.three_point_percentage}</p>
        </li>
      );
    }
    return playerList;
  };

  return (
    <div>
      <h1>Player List</h1>
      <ul>
        {renderPlayers()}
      </ul>
    </div>
  );
};

export default PlayerList;
