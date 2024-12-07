import React, { useState, useEffect } from 'react';

const PlayerForm = ({ playerId, onSubmit, onCancel }) => {
  // State to hold form data
  const [playerData, setPlayerData] = useState({
    name: '',
    team: '',
    position: '',
    pointsPerGame: '',
    assistsPerGame: '',
    reboundsPerGame: '',
    fieldGoalPercentage: '',
    threePointPercentage: '',
    image: ''
  });

  // Fetch player data if editing an existing player
  useEffect(() => {
    if (playerId) {
      // Fetch player data from the API
      fetch(`https://basketball-junkie-backend.onrender.com/api/players/${playerId}`)
        .then(response => response.json())
        .then(data => setPlayerData(data))
        .catch(error => console.error('Error fetching player:', error));
    }
  }, [playerId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerId) {
      // Update player if editing
      fetch(`https://basketball-junkie-backend.onrender.com/api/players/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
      })
        .then(response => response.json())
        .then(data => onSubmit(data)) // Pass updated player to parent
        .catch(error => console.error('Error updating player:', error));
    } else {
      // Add new player if not editing
      fetch('https://basketball-junkie-backend.onrender.com/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
      })
        .then(response => response.json())
        .then(data => onSubmit(data)) // Pass new player to parent
        .catch(error => console.error('Error adding player:', error));
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h2>{playerId ? 'Edit Player' : 'Add New Player'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={playerData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Team</label>
          <input
            type="text"
            name="team"
            value={playerData.team}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={playerData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Points per Game</label>
          <input
            type="number"
            name="pointsPerGame"
            value={playerData.pointsPerGame}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Assists per Game</label>
          <input
            type="number"
            name="assistsPerGame"
            value={playerData.assistsPerGame}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Rebounds per Game</label>
          <input
            type="number"
            name="reboundsPerGame"
            value={playerData.reboundsPerGame}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Field Goal Percentage</label>
          <input
            type="number"
            name="fieldGoalPercentage"
            value={playerData.fieldGoalPercentage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>3-Point Percentage</label>
          <input
            type="number"
            name="threePointPercentage"
            value={playerData.threePointPercentage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={playerData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">{playerId ? 'Update Player' : 'Add Player'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
