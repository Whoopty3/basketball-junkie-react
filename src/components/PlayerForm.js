import React, { useState, useEffect } from 'react';

const PlayerForm = ({ player, setPlayers, setIsEditing, setMessage }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [pointsPerGame, setPointsPerGame] = useState('');
  const [assistsPerGame, setAssistsPerGame] = useState('');
  const [reboundsPerGame, setReboundsPerGame] = useState('');
  const [fieldGoalPercentage, setFieldGoalPercentage] = useState('');
  const [threePointPercentage, setThreePointPercentage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill the form if editing an existing player
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

    // Validate input fields
    if (!name || !team || !position || !pointsPerGame || !assistsPerGame || !reboundsPerGame || !fieldGoalPercentage || !threePointPercentage) {
      setErrorMessage('All fields are required');
      return;
    }

    const playerData = {
      name,
      team,
      position,
      points_per_game: pointsPerGame,
      assists_per_game: assistsPerGame,
      rebounds_per_game: reboundsPerGame,
      field_goal_percentage: fieldGoalPercentage,
      three_point_percentage: threePointPercentage,
    };

    try {
      let response;
      if (player) {
        // If editing an existing player (PUT request)
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${player._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });

        if (response.ok) {
          const data = await response.json();
          setPlayers((prevPlayers) =>
            prevPlayers.map((p) =>
              p._id === data._id ? { ...p, ...playerData } : p
            )
          );
          setIsEditing(false);
          setMessage('Player updated successfully');
        } else {
          setErrorMessage('Failed to update player');
        }
      } else {
        // If adding a new player (POST request)
        response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });

        if (response.ok) {
          const newPlayer = await response.json();
          setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);  // Add the new player to the state
          setMessage('Player added successfully');
        } else {
          setErrorMessage('Failed to add player');
        }
      }
    } catch (error) {
      console.error('Error handling player:', error);
      setErrorMessage('Error handling player');
    }
  };

  return (
    <div>
      <h3>{player ? 'Edit Player' : 'Add Player'}</h3>
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
        <div>
          <label>Points per Game:</label>
          <input
            type="number"
            value={pointsPerGame}
            onChange={(e) => setPointsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label>Assists per Game:</label>
          <input
            type="number"
            value={assistsPerGame}
            onChange={(e) => setAssistsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label>Rebounds per Game:</label>
          <input
            type="number"
            value={reboundsPerGame}
            onChange={(e) => setReboundsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label>Field Goal Percentage:</label>
          <input
            type="number"
            value={fieldGoalPercentage}
            onChange={(e) => setFieldGoalPercentage(e.target.value)}
          />
        </div>
        <div>
          <label>3-Point Percentage:</label>
          <input
            type="number"
            value={threePointPercentage}
            onChange={(e) => setThreePointPercentage(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">{player ? 'Update Player' : 'Add Player'}</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
