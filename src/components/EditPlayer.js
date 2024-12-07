import "../css/Dialog.css";
import React, { useState, useEffect } from "react";

const EditPlayer = (props) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState("");

  useEffect(() => {
    if (props.player) {
      setInputs(props.player);
    }
  }, [props.player]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImageChange = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const editPlayer = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${props._id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.status === 200) {
      setResult("Player successfully updated!");
      props.updatePlayer(await response.json());
      event.target.reset();
      props.closeDialog();
    } else {
      setResult("Error editing player");
    }
  };

  return (
    <div id="edit-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span id="dialog-close" className="w3-button w3-display-topright" onClick={props.closeDialog}>
            &times;
          </span>
          <form id="edit-player-form" onSubmit={editPlayer}>
            <p>
              <label htmlFor="name">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={inputs.name || ""}
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
                value={inputs.team || ""}
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
                value={inputs.position || ""}
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
                value={inputs.points_per_game || ""}
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
                value={inputs.assists_per_game || ""}
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
                value={inputs.rebounds_per_game || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="field_goal_percentage">Field Goal Percentage:</label>
              <input
                type="number"
                id="field_goal_percentage"
                name="field_goal_percentage"
                required
                value={inputs.field_goal_percentage || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="three_point_percentage">3-Point Percentage:</label>
              <input
                type="number"
                id="three_point_percentage"
                name="three_point_percentage"
                required
                value={inputs.three_point_percentage || ""}
                onChange={handleChange}
              />
            </p>

            <section className="columns">
              <p id="img-prev-section">
                <img
                  id="img-prev"
                  alt=""
                  src={inputs.img != null ? URL.createObjectURL(inputs.img) : ""}
                />
              </p>
              <p id="img-upload">
                <label htmlFor="img">Upload Image:</label>
                <input
                  type="file"
                  id="img"
                  name="img"
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

export default EditPlayer;
