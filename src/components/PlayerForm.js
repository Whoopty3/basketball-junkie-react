import React, { useState, useEffect } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [formData, setFormData] = useState({ name: '', position: '', team: '' });
  const [formMessage, setFormMessage] = useState('');

  // Fetch players from the server
  useEffect(() => {
    fetch('/api/players')
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error('Error fetching players:', error));
  }, []);

  // Handle editing a player
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.team) {
      setFormMessage('All fields are required.');
      return;
    }

    const updatedPlayer = { ...formData };
    try {
      const response = await fetch(`/api/players/${selectedPlayer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlayer),
      });

      if (response.ok) {
        const updatedPlayers = players.map((player) =>
          player.id === selectedPlayer.id ? { ...player, ...updatedPlayer } : player
        );
        setPlayers(updatedPlayers);
        setFormMessage('Player successfully updated!');
      } else {
        setFormMessage('Error updating player.');
      }
    } catch (error) {
      console.error('Error editing player:', error);
      setFormMessage('Error editing player.');
    }
  };

  // Handle deleting a player
  const handleDelete = async (playerId) => {
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlayers(players.filter((player) => player.id !== playerId));
        setFormMessage('Player successfully deleted!');
      } else {
        setFormMessage('Error deleting player.');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      setFormMessage('Error deleting player.');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Player List</h1>
      {formMessage && <p>{formMessage}</p>}

      {/* Edit Form */}
      {selectedPlayer && (
        <form onSubmit={handleEdit}>
          <h2>Edit Player</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />
          <label>Team:</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleInputChange}
          />
          <button type="submit">Update Player</button>
        </form>
      )}

      {/* List of Players */}
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <span>{player.name} - {player.position} - {player.team}</span>
            <button onClick={() => setSelectedPlayer(player)}>Edit</button>
            <button onClick={() => handleDelete(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
