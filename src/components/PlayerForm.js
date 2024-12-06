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
    setErrorMessage(''); // Clear error message before validation
  
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
  
    console.log('playerData to send:', playerData);  // Add this log to ensure data is correct
  
    try {
      let response;
      if (player) {
        // (PUT request)
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${player._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
  
        if (response.ok) {
          const updatedPlayer = await response.json();
          console.log('Updated player:', updatedPlayer);  // Log to see if the update was successful
          setPlayers((prevPlayers) => {
            if (Array.isArray(prevPlayers)) {
              return prevPlayers.map((p) =>
                p._id === updatedPlayer._id ? { ...p, ...updatedPlayer } : p
              );
            } else {
              console.error('prevPlayers is not an array');
              return prevPlayers; // Handle the case where prevPlayers is not an array
            }
          });
          setMessage('Player updated successfully');
        } else {
          console.log('Failed to update player');
          setErrorMessage('Failed to update player');
        }
      } else {
        // (POST request)
        response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });
  
        if (response.ok) {
          const newPlayer = await response.json();
          console.log('New player added:', newPlayer);  // Log to verify player is added
          setPlayers((prevPlayers) => {
            if (Array.isArray(prevPlayers)) {
              return [...prevPlayers, newPlayer];  // Add the new player to the state
            } else {
              console.error('prevPlayers is not an array');
              return prevPlayers;  // Handle the case where prevPlayers is not an array
            }
          });
          setMessage('Player added successfully');
        } else {
          console.log('Failed to add player');
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
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>
        <div>
          <label htmlFor="pointsPerGame">Points per Game:</label>
          <input
            id="pointsPerGame"
            name="points_per_game"
            type="number"
            value={pointsPerGame}
            onChange={(e) => setPointsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="assistsPerGame">Assists per Game:</label>
          <input
            id="assistsPerGame"
            name="assists_per_game"
            type="number"
            value={assistsPerGame}
            onChange={(e) => setAssistsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reboundsPerGame">Rebounds per Game:</label>
          <input
            id="reboundsPerGame"
            name="rebounds_per_game"
            type="number"
            value={reboundsPerGame}
            onChange={(e) => setReboundsPerGame(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fieldGoalPercentage">Field Goal Percentage:</label>
          <input
            id="fieldGoalPercentage"
            name="field_goal_percentage"
            type="number"
            value={fieldGoalPercentage}
            onChange={(e) => setFieldGoalPercentage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="threePointPercentage">3-Point Percentage:</label>
          <input
            id="threePointPercentage"
            name="three_point_percentage"
            type="number"
            value={threePointPercentage}
            onChange={(e) => setThreePointPercentage(e.target.value)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">{player ? 'Update Player' : 'Add Player'}</button>
      </form>
    </div>
  );
};

export default PlayerForm;
