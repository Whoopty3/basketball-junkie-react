import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    pointsPerGame: "",
    assistsPerGame: "",
    reboundsPerGame: "",
    fieldGoalPercentage: "",
  });
  const [message, setMessage] = useState("");

  // Fetch player data from server
  useEffect(() => {
    axios.get("http://localhost:3001/api/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => console.error("Error fetching player data:", error));
  }, [players]); // Refetch when new player data is added

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.pointsPerGame || !formData.assistsPerGame || !formData.reboundsPerGame || !formData.fieldGoalPercentage) {
      setMessage("All fields are required.");
      return;
    }

    // Post player data to server
    axios.post("http://localhost:3001/api/players", formData)
      .then((response) => {
        setMessage("Player added successfully!");
        setFormData({
          name: "",
          pointsPerGame: "",
          assistsPerGame: "",
          reboundsPerGame: "",
          fieldGoalPercentage: "",
        });
      })
      .catch((error) => {
        setMessage("Error adding player.");
      });
  };

  return (
    <div>
      <h1>Basketball Junkie: Player Stats</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Player Name"
        />
        <input
          type="number"
          name="pointsPerGame"
          value={formData.pointsPerGame}
          onChange={handleChange}
          placeholder="Points Per Game"
        />
        <input
          type="number"
          name="assistsPerGame"
          value={formData.assistsPerGame}
          onChange={handleChange}
          placeholder="Assists Per Game"
        />
        <input
          type="number"
          name="reboundsPerGame"
          value={formData.reboundsPerGame}
          onChange={handleChange}
          placeholder="Rebounds Per Game"
        />
        <input
          type="number"
          name="fieldGoalPercentage"
          value={formData.fieldGoalPercentage}
          onChange={handleChange}
          placeholder="Field Goal Percentage"
        />
        <button type="submit">Add Player</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.name} - {player.pointsPerGame} PPG - {player.assistsPerGame} APG
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
