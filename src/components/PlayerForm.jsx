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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!playerData.name || !playerData.team || !playerData.position || isNaN(playerData.pointsPerGame) || playerData.pointsPerGame === '') {
      alert('All fields are required, and Points per Game must be a valid number!');
      return;
    }

    try {
      const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add player: ${response.statusText}`);
      }

      const newPlayer = await response.json();
      console.log('Player added successfully:', newPlayer);
      onPlayerAdd(newPlayer); // Notify parent component about the new player

      // Reset the form
      setPlayerData({
        name: '',
        team: '',
        position: '',
        pointsPerGame: '',
      });
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add the player. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete player: ${response.statusText}`);
      }

      console.log(`Player with ID ${id} deleted successfully`);
      onPlayerDelete(id); // Notify parent component about the deleted player
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete the player. Please try again later.');
    }
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
