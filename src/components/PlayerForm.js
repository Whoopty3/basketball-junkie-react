import React, { useState, useEffect } from "react";

const PlayerForm = ({ player, setPlayers, setIsEditing, setMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    position: "",
    points_per_game: "",
    assists_per_game: "",
    rebounds_per_game: "",
    field_goal_percentage: "",
    three_point_percentage: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (player) {
      setFormData({
        name: player.name || "",
        team: player.team || "",
        position: player.position || "",
        points_per_game: player.points_per_game || "",
        assists_per_game: player.assists_per_game || "",
        rebounds_per_game: player.rebounds_per_game || "",
        field_goal_percentage: player.field_goal_percentage || "",
        three_point_percentage: player.three_point_percentage || "",
      });
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    for (let key in formData) {
      if (!formData[key]) {
        setErrorMessage("All fields are required");
        return;
      }
    }

    try {
      let response;
      if (player) {
        // PUT request for editing
        response = await fetch(
          `https://basketball-junkie-backend.onrender.com/api/players/${player._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // POST request for adding
        response = await fetch(
          "https://basketball-junkie-backend.onrender.com/api/players",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      }

      if (!response.ok) {
        setErrorMessage("Failed to submit player data");
        return;
      }

      const data = await response.json();
      if (player) {
        setPlayers((prev) =>
          prev.map((p) => (p._id === data._id ? data : p))
        );
        setMessage("Player updated successfully");
      } else {
        setPlayers((prev) => [...prev, data]);
        setMessage("Player added successfully");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error handling player:", error);
      setErrorMessage("Error handling player submission");
    }
  };

  return (
    <div>
      <h3>{player ? "Edit Player" : "Add Player"}</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key.replace(/_/g, " ")}:</label>
            <input
              type={key.includes("percentage") ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">{player ? "Update Player" : "Add Player"}</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
