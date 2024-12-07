import React, { useState, useEffect } from 'react';

const PlayerForm = ({ setPlayers, player, setMessage }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [pointsPerGame, setPointsPerGame] = useState('');
  const [assistsPerGame, setAssistsPerGame] = useState('');
  const [reboundsPerGame, setReboundsPerGame] = useState('');
  const [fieldGoalPercentage, setFieldGoalPercentage] = useState('');
  const [threePointPercentage, setThreePointPercentage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const BASE_URL = process.env.REACT_APP_API_URL || 'https://basketball-junkie-backend.onrender.com/api/players';

  useEffect(() => {
    if (player) {
      setName(player.name);
      setTeam(player.team);
      setPosition(player.position);
      setPointsPerGame(player.points_per_game);
      setAssistsPerGame(player.assists_per_game);
      setReboundsPerGame(player.rebounds_per_game);
      setFieldGoalPercentage(player.field_goal_percentage);
      setThreePointPercentage(player.three_point_percentage);
    }
  }, [player]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
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
      setErrorMessage('All fields must be filled in and valid.');
      return;
    }

    const playerData = {
      name,
      team,
      position,
      points_per_game: parseFloat(pointsPerGame),
      assists_per_game: parseFloat(assistsPerGame),
      rebounds_per_game: parseFloat(reboundsPerGame),
      field_goal_percentage: parseFloat(fieldGoalPercentage),
      three_point_percentage: parseFloat(threePointPercentage),
    };

    try {
      let response;

      if (player) {
        // Update existing player (PUT request)
        response = await fetch(`${BASE_URL}/api/players/${player._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
      } else {
        // Add new player (POST request)
        response = await fetch(`${BASE_URL}/api/players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
      }

      if (response.ok) {
        const result = await response.json();
        if (player) {
          // Update player in state
          setPlayers((prevPlayers) =>
            prevPlayers.map((p) => (p._id === result._id ? { ...p, ...result } : p))
          );
          setMessage('Player updated successfully.');
        } else {
          // Add new player to state
          setPlayers((prevPlayers) => [...prevPlayers, result]);
          setMessage('Player added successfully.');
        }
        setErrorMessage('');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error handling player:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h3>{player ? 'Edit Player' : 'Add Player'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="team">Team:</label>
          <input
            id="team"
            name="team"
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            name="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pointsPerGame">Points per Game:</label>
          <input
            id="pointsPerGame"
            name="points_per_game"
            type="number"
            step="0.1"
            value={pointsPerGame}
            onChange={(e) => setPointsPerGame(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="assistsPerGame">Assists per Game:</label>
          <input
            id="assistsPerGame"
            name="assists_per_game"
            type="number"
            step="0.1"
            value={assistsPerGame}
            onChange={(e) => setAssistsPerGame(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reboundsPerGame">Rebounds per Game:</label>
          <input
            id="reboundsPerGame"
            name="rebounds_per_game"
            type="number"
            step="0.1"
            value={reboundsPerGame}
            onChange={(e) => setReboundsPerGame(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fieldGoalPercentage">Field Goal Percentage:</label>
          <input
            id="fieldGoalPercentage"
            name="field_goal_percentage"
            type="number"
            step="0.1"
            value={fieldGoalPercentage}
            onChange={(e) => setFieldGoalPercentage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="threePointPercentage">3-Point Percentage:</label>
          <input
            id="threePointPercentage"
            name="three_point_percentage"
            type="number"
            step="0.1"
            value={threePointPercentage}
            onChange={(e) => setThreePointPercentage(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">{player ? 'Update Player' : 'Add Player'}</button>
      </form>
    </div>
  );
};

export default PlayerForm;
