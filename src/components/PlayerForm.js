import React, { useState, useEffect } from 'react';

const PlayerForm = ({ player, setPlayers, setIsEditing, setMessage }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill the form if editing an existing player
  useEffect(() => {
    if (player) {
      setName(player.name);
      setTeam(player.team);
      setPosition(player.position);
    }
  }, [player]);

  // Handle form submission (Edit a player)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !team || !position) {
      setErrorMessage('All fields are required');
      return;
    }

    const updatedPlayer = {
      name,
      team,
      position,
    };

    try {
      const response = await fetch(`/api/players/${player._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer),
      });

      if (response.ok) {
        const data = await response.json();
        setPlayers((prevPlayers) =>
          prevPlayers.map((p) =>
            p._id === data._id ? { ...p, ...updatedPlayer } : p
          )
        );
        setIsEditing(false);
        setMessage('Player updated successfully');
      } else {
        setErrorMessage('Failed to update player');
      }
    } catch (error) {
      console.error('Error updating player:', error);
      setErrorMessage('Error updating player');
    }
  };

  return (
    <div>
      <h3>Edit Player</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Team:</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Update Player</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
