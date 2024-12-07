import React, { useState, useEffect } from "react";

const PlayerForm = ({ setPlayers, currentPlayer, setCurrentPlayer }) => {
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    position: "",
    points_per_game: "",
    assists_per_game: "",
    rebounds_per_game: "",
    field_goal_percentage: "",
    three_point_percentage: "",
    image: null,
  });

  useEffect(() => {
    // If there's a player to edit, populate the form with the player's data
    if (currentPlayer) {
      setFormData({
        name: currentPlayer.name || "",
        team: currentPlayer.team || "",
        position: currentPlayer.position || "",
        points_per_game: currentPlayer.points_per_game || "",
        assists_per_game: currentPlayer.assists_per_game || "",
        rebounds_per_game: currentPlayer.rebounds_per_game || "",
        field_goal_percentage: currentPlayer.field_goal_percentage || "",
        three_point_percentage: currentPlayer.three_point_percentage || "",
        image: currentPlayer.image || null,
      });
    }
  }, [currentPlayer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      if (currentPlayer) {
        // PUT request to update the player
        const response = await fetch(
          `https://basketball-junkie-backend.onrender.com/api/players/${currentPlayer._id}`,
          {
            method: "PUT",
            body: formDataObj,
          }
        );

        if (response.ok) {
          const updatedPlayer = await response.json();
          setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
              player._id === updatedPlayer._id ? updatedPlayer : player
            )
          );
          setCurrentPlayer(null); // Clear the current player after update
        } else {
          console.error("Error updating player");
        }
      } else {
        // POST request to add a new player
        const response = await fetch("https://basketball-junkie-backend.onrender.com/api/players", {
          method: "POST",
          body: formDataObj,
        });

        if (response.ok) {
          const newPlayer = await response.json();
          setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
        } else {
          console.error("Error saving player");
        }
      }
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  const handleDelete = async (playerId) => {
    try {
      const response = await fetch(
        `https://basketball-junkie-backend.onrender.com/api/players/${playerId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player._id !== playerId)
        );
      } else {
        console.error("Error deleting player");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label>Team:</label>
      <input
        type="text"
        name="team"
        value={formData.team}
        onChange={handleChange}
      />
      <label>Position:</label>
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
      />
      <label>Points per Game:</label>
      <input
        type="number"
        name="points_per_game"
        value={formData.points_per_game}
        onChange={handleChange}
      />
      <label>Assists per Game:</label>
      <input
        type="number"
        name="assists_per_game"
        value={formData.assists_per_game}
        onChange={handleChange}
      />
      <label>Rebounds per Game:</label>
      <input
        type="number"
        name="rebounds_per_game"
        value={formData.rebounds_per_game}
        onChange={handleChange}
      />
      <label>Field Goal Percentage:</label>
      <input
        type="number"
        name="field_goal_percentage"
        value={formData.field_goal_percentage}
        onChange={handleChange}
      />
      <label>Three-Point Percentage:</label>
      <input
        type="number"
        name="three_point_percentage"
        value={formData.three_point_percentage}
        onChange={handleChange}
      />
      <label>Image:</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      <button type="submit">{currentPlayer ? "Update Player" : "Add Player"}</button>
      {currentPlayer && (
        <button
          type="button"
          onClick={() => handleDelete(currentPlayer._id)}
        >
          Delete Player
        </button>
      )}
    </form>
  );
};

export default PlayerForm;
