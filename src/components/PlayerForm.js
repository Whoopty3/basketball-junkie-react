import React, { useState, useEffect } from "react";

const PlayerForm = ({ playerToEdit, onSave, onCancel, onDelete }) => {
  const [player, setPlayer] = useState({
    name: "",
    points_per_game: "",
    assists_per_game: "",
    rebounds_per_game: "",
    field_goal_percentage: "",
    three_point_percentage: "",
    team: "",
    position: "",
    image: null,
  });

  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(player); // Save the player (add or edit)
  };

  const handleDelete = () => {
    if (player._id) {
      onDelete(player._id); // Delete the player by ID
    }
  };

  return (
    <div>
      <h2>{player._id ? "Edit Player" : "Add New Player"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={player.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Points per Game:
          <input
            type="number"
            name="points_per_game"
            value={player.points_per_game}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Assists per Game:
          <input
            type="number"
            name="assists_per_game"
            value={player.assists_per_game}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rebounds per Game:
          <input
            type="number"
            name="rebounds_per_game"
            value={player.rebounds_per_game}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Field Goal Percentage:
          <input
            type="number"
            name="field_goal_percentage"
            value={player.field_goal_percentage}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Three-Point Percentage:
          <input
            type="number"
            name="three_point_percentage"
            value={player.three_point_percentage}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Team:
          <input
            type="text"
            name="team"
            value={player.team}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={player.position}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Player Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {player.image && <p>Selected Image: {player.image.name}</p>}
        </label>
        <div>
          <button type="submit">{player._id ? "Update Player" : "Add Player"}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          {player._id && (
            <button type="button" onClick={handleDelete}>
              Delete Player
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
