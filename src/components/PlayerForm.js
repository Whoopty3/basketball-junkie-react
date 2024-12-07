import React, { useState } from "react";

const PlayerForm = (props) => {
  const [inputs, setInputs] = useState({});
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

  const addPlayerToServer = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);

    const response = await fetch("http://localhost:3001/api/players", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      setResult("Player successfully added!");
      props.showNewPlayer(await response.json());
      event.target.reset();
      props.closeDialog();
    } else {
      setResult("Error adding player");
    }
  };

  return (
    <div id="add-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span
            id="dialog-close"
            className="w3-button w3-display-topright"
            onClick={props.closeDialog}
          >
            &times;
          </span>
          <form id="add-player-form" onSubmit={addPlayerToServer}>
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
              <label htmlFor="pointsPerGame">Points per Game:</label>
              <input
                type="number"
                id="pointsPerGame"
                name="pointsPerGame"
                required
                value={inputs.pointsPerGame || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="assistsPerGame">Assists per Game:</label>
              <input
                type="number"
                id="assistsPerGame"
                name="assistsPerGame"
                required
                value={inputs.assistsPerGame || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="reboundsPerGame">Rebounds per Game:</label>
              <input
                type="number"
                id="reboundsPerGame"
                name="reboundsPerGame"
                required
                value={inputs.reboundsPerGame || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="fieldGoalPercentage">Field Goal %:</label>
              <input
                type="number"
                id="fieldGoalPercentage"
                name="fieldGoalPercentage"
                required
                value={inputs.fieldGoalPercentage || ""}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="threePointPercentage">3-Point %:</label>
              <input
                type="number"
                id="threePointPercentage"
                name="threePointPercentage"
                required
                value={inputs.threePointPercentage || ""}
                onChange={handleChange}
              />
            </p>

            <section className="columns">
              <p id="img-prev-section">
                <img
                  id="img-prev"
                  alt=""
                  src={inputs.img ? URL.createObjectURL(inputs.img) : ""}
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

export default PlayerForm;
