import React, { useState, useEffect } from "react";

const PlayerForm = ({ playerToEdit, onSave, onCancel }) => {
  const [player, setPlayer] = useState(playerToEdit);

  useEffect(() => {
    setPlayer(playerToEdit);
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
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      image: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(player);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={player.name || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Points Per Game:</label>
        <input
          type="number"
          name="points_per_game"
          value={player.points_per_game || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Assists Per Game:</label>
        <input
          type="number"
          name="assists_per_game"
          value={player.assists_per_game || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rebounds Per Game:</label>
        <input
          type="number"
          name="rebounds_per_game"
          value={player.rebounds_per_game || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Field Goal Percentage:</label>
        <input
          type="number"
          name="field_goal_percentage"
          value={player.field_goal_percentage || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>3-Point Percentage:</label>
        <input
          type="number"
          name="three_point_percentage"
          value={player.three_point_percentage || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Team:</label>
        <input
          type="text"
          name="team"
          value={player.team || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={player.position || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {player.image && <img src={player.image} alt="Player" />}
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default PlayerForm;
