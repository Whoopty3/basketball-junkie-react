import React, { useEffect, useState } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]); // Ensure default value is an empty array
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setPlayers(data);
        } else {
          throw new Error('Fetched data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        setErrorMessage('Failed to fetch players. Please try again later.');
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
