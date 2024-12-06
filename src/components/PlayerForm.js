import React, { useState } from "react";
import axios from "axios";

const PlayerForm = ({ onPlayerAdded }) => {
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

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const validationErrors = {};
    if (!formData.name || formData.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters.";
    }
    if (!formData.team || formData.team.length < 3) {
      validationErrors.team = "Team must be at least 3 characters.";
    }
    if (!formData.position || formData.position.length < 3) {
      validationErrors.position = "Position must be at least 3 characters.";
    }
    if (!formData.points_per_game || isNaN(formData.points_per_game)) {
      validationErrors.points_per_game = "Points per game must be a number.";
    }
    if (!formData.assists_per_game || isNaN(formData.assists_per_game)) {
      validationErrors.assists_per_game = "Assists per game must be a number.";
    }
    if (!formData.rebounds_per_game || isNaN(formData.rebounds_per_game)) {
      validationErrors.rebounds_per_game = "Rebounds per game must be a number.";
    }
    if (!formData.field_goal_percentage || isNaN(formData.field_goal_percentage)) {
      validationErrors.field_goal_percentage = "Field goal percentage must be a number.";
    }
    if (!formData.three_point_percentage || isNaN(formData.three_point_percentage)) {
      validationErrors.three_point_percentage = "Three-point percentage must be a number.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setSuccess(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://basketball-junkie-backend.onrender.com/api/players", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setFormData({
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
      setErrors({});
      if (onPlayerAdded) {
        onPlayerAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding player:", error.response?.data || error.message);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Player</h2>
      {success && <p style={{ color: "green" }}>Player added successfully!</p>}
      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}

      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Team:</label>
        <input type="text" name="team" value={formData.team} onChange={handleChange} />
      </div>
      <div>
        <label>Position:</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} />
      </div>
      <div>
        <label>Points Per Game:</label>
        <input type="number" name="points_per_game" value={formData.points_per_game} onChange={handleChange} />
      </div>
      <div>
        <label>Assists Per Game:</label>
        <input type="number" name="assists_per_game" value={formData.assists_per_game} onChange={handleChange} />
      </div>
      <div>
        <label>Rebounds Per Game:</label>
        <input type="number" name="rebounds_per_game" value={formData.rebounds_per_game} onChange={handleChange} />
      </div>
      <div>
        <label>Field Goal Percentage:</label>
        <input type="number" name="field_goal_percentage" value={formData.field_goal_percentage} onChange={handleChange} />
      </div>
      <div>
        <label>Three Point Percentage:</label>
        <input type="number" name="three_point_percentage" value={formData.three_point_percentage} onChange={handleChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;
