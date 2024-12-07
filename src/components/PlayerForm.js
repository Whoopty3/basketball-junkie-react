import React, { useState } from 'react';
import axios from 'axios';

const PlayerForm = () => {
  const [playerData, setPlayerData] = useState({
    name: '',
    team: '',
    position: '',
    points_per_game: '',
    assists_per_game: '',
    rebounds_per_game: '',
    field_goal_percentage: '',
    three_point_percentage: ''
  });

  const [image, setImage] = useState(null);

  // Handle input changes for player data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  // Handle file input (image)
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit the form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append player data to FormData
    for (let key in playerData) {
      formData.append(key, playerData[key]);
    }
    // Append the image if it exists
    if (image) {
      formData.append('image', image);
    }

    try {
      // Make the POST request to your backend API
      const response = await axios.post('https://basketball-junkie-backend.onrender.com/api/players', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Player added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Error adding player');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Player Name"
        value={playerData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="team"
        placeholder="Team"
        value={playerData.team}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={playerData.position}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="points_per_game"
        placeholder="Points per game"
        value={playerData.points_per_game}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="assists_per_game"
        placeholder="Assists per game"
        value={playerData.assists_per_game}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="rebounds_per_game"
        placeholder="Rebounds per game"
        value={playerData.rebounds_per_game}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="field_goal_percentage"
        placeholder="Field Goal Percentage"
        value={playerData.field_goal_percentage}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="three_point_percentage"
        placeholder="Three Point Percentage"
        value={playerData.three_point_percentage}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;
