import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    team: "",
    points: "",
    assists: "",
    rebounds: "",
    fieldGoalPercentage: "",
    threePointPercentage: "",
    image: null,
  });
  const [error, setError] = useState(null);

  // Fetch players from the backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://basketball-junkie-backend.onrender.com/api/players"
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
        setError("Error fetching players data.");
      }
    };

    fetchPlayers();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setNewPlayer((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  // Submit the new player
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Input validation
    if (!newPlayer.name || !newPlayer.team || !newPlayer.points || !newPlayer.assists || !newPlayer.rebounds || !newPlayer.fieldGoalPercentage || !newPlayer.threePointPercentage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    Object.keys(newPlayer).forEach((key) => {
      formData.append(key, newPlayer[key]);
    });

    try {
      const response = await axios.post(
        "https://basketball-junkie-backend.onrender.com/api/players",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update the players list with the new player
      setPlayers((prevState) => [...prevState, response.data]);

      // Reset form fields
      setNewPlayer({
        name: "",
        team: "",
        points: "",
        assists: "",
        rebounds: "",
        fieldGoalPercentage: "",
        threePointPercentage: "",
        image: null,
      });
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error adding player:", error);
      setError("There was an error adding the player.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Players</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Team</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Points</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Assists</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Rebounds</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Field Goal %</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>3-Point %</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.team}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.points}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.assists}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{player.rebounds}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {player.fieldGoalPercentage}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {player.threePointPercentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h2>Add New Player</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Team:</label>
        <input
          type="text"
          name="team"
          value={newPlayer.team}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Points:</label>
        <input
          type="number"
          name="points"
          value={newPlayer.points}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Assists:</label>
        <input
          type="number"
          name="assists"
          value={newPlayer.assists}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Rebounds:</label>
        <input
          type="number"
          name="rebounds"
          value={newPlayer.rebounds}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Field Goal Percentage:</label>
        <input
          type="number"
          name="fieldGoalPercentage"
          value={newPlayer.fieldGoalPercentage}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>3-Point Percentage:</label>
        <input
          type="number"
          name="threePointPercentage"
          value={newPlayer.threePointPercentage}
          onChange={handleInputChange}
          required
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          style={{
            padding: "8px",
            fontSize: "14px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Player
        </button>
      </form>
    </div>
  );
};

export default Players;
