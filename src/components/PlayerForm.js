// PlayerForm.js
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
    }
  }, [selectedPlayer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.points || !formData.assists || !formData.rebounds || !formData.fieldGoalPercentage || !formData.threePointPercentage) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      let response;
      let updatedPlayer;

      if (selectedPlayer) {
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${selectedPlayer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        updatedPlayer = await response.json();
      } else {
        response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        updatedPlayer = await response.json();
      }

      if (response.ok) {
        setPlayers((prev) => {
          if (selectedPlayer) {
            return prev.map((player) =>
              player.id === selectedPlayer.id ? { ...player, ...updatedPlayer } : player
            );
          } else {
            return [...prev, updatedPlayer];
          }
        });

        alert(selectedPlayer ? 'Player updated successfully!' : 'Player added successfully!');
        setSelectedPlayer(null);
      } else {
        alert('Failed to save player.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving player.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Points"
        value={formData.points}
        onChange={(e) => setFormData({ ...formData, points: e.target.value })}
      />
      <input
        type="number"
        placeholder="Assists"
        value={formData.assists}
        onChange={(e) => setFormData({ ...formData, assists: e.target.value })}
      />
      <input
        type="number"
        placeholder="Rebounds"
        value={formData.rebounds}
        onChange={(e) => setFormData({ ...formData, rebounds: e.target.value })}
      />
      <input
        type="number"
        placeholder="Field Goal Percentage"
        value={formData.fieldGoalPercentage}
        onChange={(e) => setFormData({ ...formData, fieldGoalPercentage: e.target.value })}
      />
      <input
        type="number"
        placeholder="3-Point Percentage"
        value={formData.threePointPercentage}
        onChange={(e) => setFormData({ ...formData, threePointPercentage: e.target.value })}
      />
      <button type="submit">{selectedPlayer ? 'Update Player' : 'Add Player'}</button>
    </form>
  );
};

export default PlayerForm;
