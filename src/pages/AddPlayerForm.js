import React, { useState } from 'react';
import axios from 'axios';

const AddPlayerForm = ({ setPlayers, players }) => {
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    team: '',
    points: '',
    assists: '',
    rebounds: '',
    fieldGoalPercentage: '',
    threePointPercentage: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://basketball-junkie-backend.onrender.com/api/players", newPlayer);

      // After the player is added, update the players state with the new list
      setPlayers([...players, response.data]); // Assuming the backend returns the added player

      // Reset form fields
      setNewPlayer({
        name: '',
        team: '',
        points: '',
        assists: '',
        rebounds: '',
        fieldGoalPercentage: '',
        threePointPercentage: '',
        image: ''
      });
    } catch (err) {
      console.error("Error adding player:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Player</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={newPlayer.name}
        onChange={handleInputChange}
        required
      />
      <label>Team:</label>
      <input
        type="text"
        name="team"
        value={newPlayer.team}
        onChange={handleInputChange}
        required
      />
      <label>Points:</label>
      <input
        type="number"
        name="points"
        value={newPlayer.points}
        onChange={handleInputChange}
        required
      />
      <label>Assists:</label>
      <input
        type="number"
        name="assists"
        value={newPlayer.assists}
        onChange={handleInputChange}
        required
      />
      <label>Rebounds:</label>
      <input
        type="number"
        name="rebounds"
        value={newPlayer.rebounds}
        onChange={handleInputChange}
        required
      />
      <label>Field Goal Percentage:</label>
      <input
        type="number"
        name="fieldGoalPercentage"
        value={newPlayer.fieldGoalPercentage}
        onChange={handleInputChange}
        required
      />
      <label>3-Point Percentage:</label>
      <input
        type="number"
        name="threePointPercentage"
        value={newPlayer.threePointPercentage}
        onChange={handleInputChange}
        required
      />
      <label>Image URL:</label>
      <input
        type="text"
        name="image"
        value={newPlayer.image}
        onChange={handleInputChange}
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
