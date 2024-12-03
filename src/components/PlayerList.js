import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch players from the server on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  // Delete a player
  const deletePlayer = async (id) => {
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPlayers(players.filter((player) => player._id !== id));
        setMessage('Player deleted successfully');
      } else {
        setMessage('Failed to delete player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      setMessage('Error deleting player');
    }
  };

  // Edit a player (sets the current player to be edited)
  const editPlayer = (player) => {
    setIsEditing(true);
    setCurrentPlayer(player);
  };

  return (
    <div>
      <h2>Player List</h2>
      {message && <p>{message}</p>}

      {/* Show the form to edit a player */}
      {isEditing && (
        <PlayerForm
          player={currentPlayer}
          setPlayers={setPlayers}
          setIsEditing={setIsEditing}
          setMessage={setMessage}
        />
      )}

      {/* List of players */}
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            <span>{player.name}</span> - {player.team} ({player.position})
            <button onClick={() => editPlayer(player)}>Edit</button>
            <button onClick={() => deletePlayer(player._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
