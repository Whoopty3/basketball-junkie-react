import React, { useState } from "react";

const PlayerForm = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    team: "",
    position: "",
    points_per_game: "",
    assists_per_game: "",
    rebounds_per_game: "",
    field_goal_percentage: "",
    three_point_percentage: "",
    img: null,
  });
  const [result, setResult] = useState("");

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

  const onSubmitPost = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    const response = await fetch("https://basketball-junkie-backend.onrender.com/api/players", {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      setResult("Player successfully added");
      event.target.reset();
      props.addPlayer(await response.json());
    } else {
      setResult("Error adding player. We're sorry");
    }
  };

  const onSubmitPut = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${props._id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.status === 200) {
      setResult("Player successfully updated");
      event.target.reset();
      props.updatePlayer(await response.json());
      props.closeDialog();
    } else {
      setResult("Error editing your player. We're sorry");
    }
  };

  const onDelete = async () => {
    const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${props._id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setResult("Player successfully deleted");
      props.removePlayer(props._id);  // Assuming this is the method to remove the player from the parent state
    } else {
      setResult("Error deleting player. We're sorry");
    }
  };

  return (
    <div id="player-form-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeDialog}
          >
            &times;
          </span>
          <form
            id="edit-player-form"
            onSubmit={props._id ? onSubmitPut : onSubmitPost}
          >
            <p>
              <label htmlFor="name">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="team">Team:</label>
              <input
                type="text"
                id="team"
                name="team"
                value={inputs.team || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value={inputs.position || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="points_per_game">Points Per Game:</label>
              <input
                type="number"
                id="points_per_game"
                name="points_per_game"
                value={inputs.points_per_game || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="assists_per_game">Assists Per Game:</label>
              <input
                type="number"
                id="assists_per_game"
                name="assists_per_game"
                value={inputs.assists_per_game || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="rebounds_per_game">Rebounds Per Game:</label>
              <input
                type="number"
                id="rebounds_per_game"
                name="rebounds_per_game"
                value={inputs.rebounds_per_game || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="field_goal_percentage">Field Goal Percentage:</label>
              <input
                type="number"
                id="field_goal_percentage"
                name="field_goal_percentage"
                value={inputs.field_goal_percentage || ""}
                onChange={handleChange}
                required
              />
            </p>
            <p>
              <label htmlFor="three_point_percentage">3-Point Percentage:</label>
              <input
                type="number"
                id="three_point_percentage"
                name="three_point_percentage"
                value={inputs.three_point_percentage || ""}
                onChange={handleChange}
                required
              />
            </p>

            <section className="columns">
              <p id="img-prev-section">
                <img
                  id="img-prev"
                  src={
                    inputs.img != null
                      ? URL.createObjectURL(inputs.img)
                      : inputs.prev_img != null
                      ? `https://basketball-junkie-backend.onrender.com/images/${inputs.prev_img}`
                      : ""
                  }
                  alt=""
                />
              </p>
              <p id="img-upload">
                <label htmlFor="img">Upload Image:</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </p>
            </section>
            <p>
              <button type="submit">{props._id ? "Update Player" : "Add Player"}</button>
            </p>
            <p>{result}</p>
            {props._id && (
              <button type="button" onClick={onDelete}>
                Delete Player
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
