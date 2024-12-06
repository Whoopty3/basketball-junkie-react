import React, { useState, useEffect } from 'react';

const PlayerForm = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    position: '',
    pointsPerGame: '',
    assistsPerGame: '',
    reboundsPerGame: '',
    fieldGoalPercentage: '',
    threePointPercentage: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch players from the server
  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      setErrorMessage('Failed to fetch players.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Validate the form data client-side
  const validateForm = () => {
    const {
      name,
      team,
      position,
      pointsPerGame,
      assistsPerGame,
      reboundsPerGame,
      fieldGoalPercentage,
      threePointPercentage,
    } = formData;

    if (
      !name ||
      !team ||
      !position ||
      isNaN(pointsPerGame) ||
      isNaN(assistsPerGame) ||
      isNaN(reboundsPerGame) ||
      isNaN(fieldGoalPercentage) ||
      isNaN(threePointPercentage)
    ) {
      return 'All fields must be filled out correctly.';
    }

    if (
      fieldGoalPercentage < 0 ||
      fieldGoalPercentage > 100 ||
      threePointPercentage < 0 ||
      threePointPercentage > 100
    ) {
      return 'Percentages must be between 0 and 100.';
    }

    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      if (isEditing) {
        // PUT request to edit player
        const response = await fetch(`/api/players/${editPlayerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to edit player.');
        }

        setMessage('Player edited successfully.');
        setIsEditing(false);
        setEditPlayerId(null);
      } else {
        // POST request to add player
        const response = await fetch('/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to add player.');
        }

        setMessage('Player added successfully.');
      }

      setFormData({
        name: '',
        team: '',
        position: '',
        pointsPerGame: '',
        assistsPerGame: '',
        reboundsPerGame: '',
        fieldGoalPercentage: '',
        threePointPercentage: '',
      });
      fetchPlayers();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle editing a player
  const handleEdit = (player) => {
    setIsEditing(true);
    setEditPlayerId(player._id);
    setFormData({
      name: player.name,
      team: player.team,
      position: player.position,
      pointsPerGame: player.points_per_game,
      assistsPerGame: player.assists_per_game,
      reboundsPerGame: player.rebounds_per_game,
      fieldGoalPercentage: player.field_goal_percentage,
      threePointPercentage: player.three_point_percentage,
    });
  };

  // Handle deleting a player
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete player.');
      }

      setMessage('Player deleted successfully.');
      fetchPlayers();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Player' : 'Add Player'}</h1>
      <form onSubmit={handleSubmit}>
        {['name', 'team', 'position', 'pointsPerGame', 'assistsPerGame', 'reboundsPerGame', 'fieldGoalPercentage', 'threePointPercentage'].map((field) => (
          <div key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1')}: </label>
            <input
              type={field.includes('Percentage') || field.includes('PerGame') ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">{isEditing ? 'Save Changes' : 'Add Player'}</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Player List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Rebounds</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 ? (
            players.map((player) => (
              <tr key={player._id}>
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.position}</td>
                <td>{player.points_per_game}</td>
                <td>{player.assists_per_game}</td>
                <td>{player.rebounds_per_game}</td>
                <td>{player.field_goal_percentage}</td>
                <td>{player.three_point_percentage}</td>
                <td>
                  <button onClick={() => handleEdit(player)}>Edit</button>
                  <button onClick={() => handleDelete(player._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No players available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerForm;
