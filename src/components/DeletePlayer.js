import React, { useState } from "react";

const DeletePlayer = (props) => {
  const [result, setResult] = useState("");

  const onDelete = async () => {
    setResult("Deleting....");

    const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${props._id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setResult("Player successfully deleted");
      props.removePlayer(props._id);
      props.closeDialog();
    } else {
      setResult("Error deleting player");
    }
  };

  return (
    <div id="delete-dialog" className="w3-modal">
      <div className="w3-modal-content">
        <div className="w3-container">
          <span id="dialog-close" className="w3-button w3-display-topright" onClick={props.closeDialog}>
            &times;
          </span>
          <h3>Are you sure you want to delete this player?</h3>
          <button onClick={onDelete}>Delete Player</button>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayer;
