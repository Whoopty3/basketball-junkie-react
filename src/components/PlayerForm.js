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

    console.log('playerData to send:', playerData);  // Add this log to ensure data is correct

    try {
      let response;
      if (player) {
        // (PUT request)
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData),
        });

        if (response.ok) {
          const updatedPlayer = await response.json();
          console.log('Updated player:', updatedPlayer);  // Log to see if the update was successful
          setPlayers((prevPlayers) =>
            prevPlayers.map((p) =>
              p._id === updatedPlayer._id ? { ...p, ...updatedPlayer } : p
            )
          );
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
          setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);  // Add the new player to the state
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
