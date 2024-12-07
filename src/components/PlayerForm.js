import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayerForm = () => {
  const { id } = useParams(); // Get player ID from the route
  const navigate = useNavigate();
  const [player, setPlayer] = useState({ name: '', position: '', team: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [formType, setFormType] = useState('add'); // Tracks form type (add, edit, delete)

  useEffect(() => {
    if (id) {
      setFormType('edit'); // Set form type to 'edit' if an ID is present
      // Fetch player data for editing (replace with actual API call)
      fetch(`/api/players/${id}`)
        .then((response) => response.json())
        .then((data) => setPlayer(data))
        .catch((error) => setStatusMessage('Failed to load player data'));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formType === 'edit' ? 'PUT' : 'POST';
    const url = formType === 'edit' ? `/api/players/${id}` : '/api/players';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatusMessage(`Player ${formType === 'edit' ? 'updated' : 'added'} successfully.`);
        navigate('/players');
      })
      .catch((error) => setStatusMessage('Error saving player.'));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      fetch(`/api/players/${id}`, { method: 'DELETE' })
        .then(() => {
          setStatusMessage('Player deleted successfully.');
          navigate('/players');
        })
        .catch(() => setStatusMessage('Error deleting player.'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>{formType === 'edit' ? 'Edit Player' : 'Add Player'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={player.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Position:</label>
          <input type="text" name="position" value={player.position} onChange={handleChange} required />
        </div>
        <div>
          <label>Team:</label>
          <input type="text" name="team" value={player.team} onChange={handleChange} required />
        </div>
        <button type="submit">{formType === 'edit' ? 'Update Player' : 'Add Player'}</button>
      </form>

      {formType === 'edit' && (
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete Player
        </button>
      )}

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default PlayerForm;
