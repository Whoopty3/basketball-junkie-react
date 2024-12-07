import React, { useState, useEffect } from 'react';

const PlayerForm = ({ selectedPlayer, setPlayers, setSelectedPlayer }) => {
  const [formData, setFormData] = useState({
    name: '',
    points: '',
    assists: '',
    rebounds: '',
    fieldGoalPercentage: '',
    threePointPercentage: ''
  });

  // When selectedPlayer changes, update the form data
  useEffect(() => {
    if (selectedPlayer) {
      setFormData({
        name: selectedPlayer.name,
        points: selectedPlayer.points,
        assists: selectedPlayer.assists,
        rebounds: selectedPlayer.rebounds,
        fieldGoalPercentage: selectedPlayer.fieldGoalPercentage,
        threePointPercentage: selectedPlayer.threePointPercentage
      });
    } else {
      // If no player is selected, clear the form
      setFormData({
        name: '',
        points: '',
        assists: '',
        rebounds: '',
        fieldGoalPercentage: '',
        threePointPercentage: ''
      });
    }
  }, [selectedPlayer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit (POST or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.points || !formData.assists || !formData.rebounds || !formData.fieldGoalPercentage || !formData.threePointPercentage) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      let response;
      if (selectedPlayer) {
        // PUT request to update the existing player
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${selectedPlayer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // POST request to create a new player
        response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        const updatedPlayer = await response.json();
        // Add or update the player in the state
        if (selectedPlayer) {
          setPlayers((prev) =>
            prev.map((player) =>
              player.id === selectedPlayer.id ? { ...player, ...updatedPlayer } : player
            )
          );
          alert('Player updated successfully!');
        } else {
          setPlayers((prev) => [...prev, updatedPlayer]);
          alert('Player added successfully!');
        }
        setSelectedPlayer(null); // Reset the selected player after adding/updating
      } else {
        console.error('Error:', response);
        alert('Failed to save player.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving player.');
    }
  };

  // Handle player deletion
  const handleDelete = async () => {
    if (!selectedPlayer) return;

    try {
      const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${selectedPlayer.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPlayers((prev) => prev.filter((player) => player.id !== selectedPlayer.id));
        alert('Player deleted successfully!');
        setSelectedPlayer(null); // Reset the selected player after deletion
      } else {
        console.error('Error:', response);
        alert('Failed to delete player.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting player.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedPlayer ? 'Edit Player' : 'Add Player'}</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Points:</label>
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Assists:</label>
        <input
          type="number"
          name="assists"
          value={formData.assists}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Rebounds:</label>
        <input
          type="number"
          name="rebounds"
          value={formData.rebounds}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Field Goal Percentage:</label>
        <input
          type="number"
          name="fieldGoalPercentage"
          value={formData.fieldGoalPercentage}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Three Point Percentage:</label>
        <input
          type="number"
          name="threePointPercentage"
          value={formData.threePointPercentage}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">{selectedPlayer ? 'Update Player' : 'Add Player'}</button>
      
      {selectedPlayer && (
        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Player
        </button>
      )}
    </form>
  );
};

export default PlayerForm;
