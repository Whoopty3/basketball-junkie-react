import React, { useState, useEffect } from "react";

// PlayerForm Component
const PlayerForm = ({ playerToEdit, onSave, onCancel, onDelete }) => {
  const [player, setPlayer] = useState({
    id: "",
    name: "",
    team: "",
    position: "",
    pointsPerGame: "",  // Added
    assistsPerGame: "",  // Added
    reboundsPerGame: "",  // Added
    fieldGoalPercentage: "",
    threePointPercentage: "",
  });

  useEffect(() => {
    if (playerToEdit) {
      setPlayer({ ...playerToEdit });
    }
  }, [playerToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(player);  // Ensure onSave is called properly
    }
  };

  const handleDelete = () => {
    if (onDelete && player.id) {
      onDelete(player.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{player.id ? "Edit Player" : "Add New Player"}</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Team:
        <input
          type="text"
          name="team"
          value={player.team}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Position:
        <input
          type="text"
          name="position"
          value={player.position}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Points Per Game:
        <input
          type="number"
          name="pointsPerGame"
          value={player.pointsPerGame}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Assists Per Game: {/* Added field */}
        <input
          type="number"
          name="assistsPerGame"
          value={player.assistsPerGame}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Rebounds Per Game: {/* Added field */}
        <input
          type="number"
          name="reboundsPerGame"
          value={player.reboundsPerGame}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Field Goal Percentage:
        <input
          type="number"
          name="fieldGoalPercentage"
          value={player.fieldGoalPercentage}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Three-Point Percentage:
        <input
          type="number"
          name="threePointPercentage"
          value={player.threePointPercentage}
          onChange={handleInputChange}
          required
        />
      </label>
      <div>
        <button type="submit">
          {player.id ? "Save Changes" : "Add Player"}
        </button>
        {player.id && (
          <button type="button" onClick={handleDelete}>
            Delete Player
          </button>
        )}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;