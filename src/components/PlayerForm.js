import "../css/Dialog.css";
import React, { useState } from "react";

const PlayerForm = ({ playerToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: playerToEdit?.name || "",
    points_per_game: playerToEdit?.points_per_game || "",
    assists_per_game: playerToEdit?.assists_per_game || "",
    rebounds_per_game: playerToEdit?.rebounds_per_game || "",
    field_goal_percentage: playerToEdit?.field_goal_percentage || "",
    three_point_percentage: playerToEdit?.three_point_percentage || "",
    team: playerToEdit?.team || "",
    position: playerToEdit?.position || "",
    image: null,
  });

  const [result, setResult] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Saving...");

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const url = playerToEdit
        ? `https://basketball-junkie-backend.onrender.com/api/players/${playerToEdit._id}`
        : "https://basketball-junkie-backend.onrender.com/api/players";
      const method = playerToEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: submitData,
      });

      if (response.ok) {
        setResult("Player successfully saved!");
        onSave(await response.json());
      } else {
        throw new Error("Failed to save player");
      }
    } catch (error) {
      setResult("Error saving player: " + error.message);
    }
  };

  return (
    <div id="add-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={onCancel}
          >
            &times;
          </span>
          <form id="player-form" onSubmit={handleSubmit}>
            <p>
              <label htmlFor="name">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="points_per_game">Points Per Game:</label>
              <input
                type="number"
                id="points_per_game"
                name="points_per_game"
                required
                value={formData.points_per_game}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="assists_per_game">Assists Per Game:</label>
              <input
                type="number"
                id="assists_per_game"
                name="assists_per_game"
                required
                value={formData.assists_per_game}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="rebounds_per_game">Rebounds Per Game:</label>
              <input
                type="number"
                id="rebounds_per_game"
                name="rebounds_per_game"
                required
                value={formData.rebounds_per_game}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="field_goal_percentage">Field Goal %:</label>
              <input
                type="number"
                id="field_goal_percentage"
                name="field_goal_percentage"
                required
                value={formData.field_goal_percentage}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="three_point_percentage">Three-Point %:</label>
              <input
                type="number"
                id="three_point_percentage"
                name="three_point_percentage"
                required
                value={formData.three_point_percentage}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="team">Team:</label>
              <input
                type="text"
                id="team"
                name="team"
                required
                value={formData.team}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
              />
            </p>
            <section className="columns">
              <p id="img-prev-section">
                <img
                  id="img-prev"
                  alt=""
                  src={formData.image ? URL.createObjectURL(formData.image) : ""}
                />
              </p>
              <p id="img-upload">
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </p>
            </section>
            <p>
              <button type="submit">Submit</button>
            </p>
            <p>{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
