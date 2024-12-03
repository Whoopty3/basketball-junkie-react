import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';

const ParentComponent = () => {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Fetch player data when component mounts
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players');
        const data = await response.json();
        setPlayers(data);  // This sets the players data into state
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Basketball Players</h1>
      {/* Pass setPlayers, setMessage, currentPlayer to PlayerForm */}
      <PlayerForm
        setPlayers={setPlayers}  // Passing setPlayers here
        setMessage={setMessage}
        player={currentPlayer}
      />
      <div>
        {message && <p>{message}</p>}
      </div>
      {/* Display the list of players */}
      <div>
        {players.map((player) => (
          <div key={player._id}>
            <p>{player.name} - {player.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentComponent;