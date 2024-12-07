import React, { useState } from 'react';

const PlayerForm = ({ onPlayerAdd, onPlayerDelete }) => {
  const [playerData, setPlayerData] = useState({
    name: '',
    team: '',
    position: '',
    pointsPerGame: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!playerData.name || !playerData.team || !playerData.position || !playerData.pointsPerGame) {
      alert('All fields are required!');
      return;
    }

    // Make POST request to add player
    fetch('https://basketball-junkie-backend.onrender.com/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add player');
        }
        return response.json();
      })
      .then((newPlayer) => {
        onPlayerAdd(newPlayer); // Notify parent component about the new player
        setPlayerData({
          name: '',
          team: '',
          position: '',
          pointsPerGame: '',
        });
      })
      .catch((error) => console.error('Error adding player:', error));
  };

  const handleDelete = (id) => {
    // Make DELETE request to remove player
    fetch(`https://basketball-junkie-backend.onrender.com/api/players/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onPlayerDelete(id); // Notify parent component about the deleted player
        } else {
          console.error('Failed to delete player');
        }
      })
      .catch((error) => console.error('Error deleting player:', error));
  };

  return (
    <div>
      <h3>Add a New Player</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={playerData.name}
            onChange={handleInputChange}
            placeholder="Player Name"
          />
        </div>
        <div>
          <label>Team:</label>
          <input
            type="text"
            name="team"
            value={playerData.team}
            onChange={handleInputChange}
            placeholder="Player's Team"
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={playerData.position}
            onChange={handleInputChange}
            placeholder="Player's Position"
          />
        </div>
        <div>
          <label>Points per Game:</label>
          <input
            type="number"
            name="pointsPerGame"
            value={playerData.pointsPerGame}
            onChange={handleInputChange}
            placeholder="Points per Game"
          />
        </div>
        <button type="submit">Add Player</button>
      </form>

      <h3>Delete a Player</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const playerId = e.target.elements.playerId.value.trim();
          if (!playerId) {
            alert('Please provide a valid player ID!');
            return;
          }
          handleDelete(playerId);
          e.target.reset();
        }}
      >
        <div>
          <label>Player ID:</label>
          <input type="text" name="playerId" placeholder="Enter Player ID to delete" />
        </div>
        <button type="submit">Delete Player</button>
      </form>
    </div>
  );
};

export default PlayerForm;
