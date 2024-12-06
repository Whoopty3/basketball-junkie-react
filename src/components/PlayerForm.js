import React, { useState, useEffect } from 'react';


const PlayerForm = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({ name: '', team: '', position: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch players on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      if (!response.ok) throw new Error('Failed to fetch players.');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setErrorMessage('Could not load player data.');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.team.trim() || !formData.position.trim()) {
      return 'All fields are required.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      const response = await fetch(
        isEditing ? `/api/players/${editPlayerId}` : '/api/players',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error('Failed to process player.');
      setMessage(isEditing ? 'Player updated successfully!' : 'Player added successfully!');
      setFormData({ name: '', team: '', position: '' });
      setIsEditing(false);
      fetchPlayers();
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleEdit = (player) => {
    setFormData(player);
    setIsEditing(true);
    setEditPlayerId(player.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/players/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete player.');
      setMessage('Player deleted successfully!');
      fetchPlayers();
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while deleting the player.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="player-form-container">
      <h1>Add / Edit Player</h1>
      {message && <p className="success-message">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="player-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Team:</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Player' : 'Add Player'}</button>
      </form>

      <h2>Player List</h2>
      <table className="player-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>
                <button onClick={() => handleEdit(player)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(player.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerForm;
