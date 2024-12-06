import React, { useState } from 'react';

const PlayerForm = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [pointsPerGame, setPointsPerGame] = useState('');
  const [assistsPerGame, setAssistsPerGame] = useState('');
  const [reboundsPerGame, setReboundsPerGame] = useState('');
  const [fieldGoalPercentage, setFieldGoalPercentage] = useState('');
  const [threePointPercentage, setThreePointPercentage] = useState('');
  const [message, setMessage] = useState('');  // Local state for success message
  const [errorMessage, setErrorMessage] = useState('');  // Local state for error message
  const [player, setPlayer] = useState(null); // Only used if editing an existing player

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    // Validate input fields
    if (!name || !team || !position || !pointsPerGame || !assistsPerGame || !reboundsPerGame || !fieldGoalPercentage || !threePointPercentage) {
      setErrorMessage('All fields are required');
      return;
    }

    // Convert inputs to numbers
    const points = parseFloat(pointsPerGame);
    const assists = parseFloat(assistsPerGame);
    const rebounds = parseFloat(reboundsPerGame);
    const fieldGoal = parseFloat(fieldGoalPercentage);
    const threePoint = parseFloat(threePointPercentage);

    if (isNaN(points) || isNaN(assists) || isNaN(rebounds) || isNaN(fieldGoal) || isNaN(threePoint)) {
      setErrorMessage('Please enter valid numeric values');
      return;
    }

    if (fieldGoal < 0 || fieldGoal > 100 || threePoint < 0 || threePoint > 100) {
      setErrorMessage('Field goal percentage and 3-point percentage must be between 0 and 100');
      return;
    }

    const playerData = {
      name,
      team,
      position,
      points_per_game: points,
      assists_per_game: assists,
      rebounds_per_game: rebounds,
      field_goal_percentage: fieldGoal,
      three_point_percentage: threePoint,
    };

    try {
      let response;
      if (player) {
        // If we are editing an existing player, send a PUT request
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${player._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });

        if (response.ok) {
          const updatedPlayer = await response.json();
          setMessage('Player updated successfully');
        } else {
          setErrorMessage('Failed to update player');
        }
      } else {
        // If we are adding a new player, send a POST request
        response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });

        if (response.ok) {
          const newPlayer = await response.json();
          setMessage('Player added successfully');
        } else {
          setErrorMessage('Failed to add player');
        }
      }
    } catch (error) {
      setErrorMessage('Error handling player');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Team:</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Points Per Game:</label>
        <input
          type="number"
          value={pointsPerGame}
          onChange={(e) => setPointsPerGame(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Assists Per Game:</label>
        <input
          type="number"
          value={assistsPerGame}
          onChange={(e) => setAssistsPerGame(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rebounds Per Game:</label>
        <input
          type="number"
          value={reboundsPerGame}
          onChange={(e) => setReboundsPerGame(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Field Goal Percentage:</label>
        <input
          type="number"
          value={fieldGoalPercentage}
          onChange={(e) => setFieldGoalPercentage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>3-Point Percentage:</label>
        <input
          type="number"
          value={threePointPercentage}
          onChange={(e) => setThreePointPercentage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      <div>
        {message && <p>{message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </form>
  );
};

export default PlayerForm;
