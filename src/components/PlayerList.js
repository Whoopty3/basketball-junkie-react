import React, { useState, useEffect } from "react";

// PlayerForm Component
const PlayerForm = ({ playerToEdit, onSave, onCancel, onDelete }) => {
  const [player, setPlayer] = useState({
    id: "",
    name: "",
    team: "",
    points: "",
    assists: "",
    rebounds: "",
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
    onSave(player);
  };

  const handleDelete = () => {
    onDelete(player.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{player.id ? "Edit Player" : "Add New Player"}</h2>
      <label>Name:
        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Team:
        <input
          type="text"
          name="team"
          value={player.team}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Points:
        <input
          type="number"
          name="points"
          value={player.points}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Assists:
        <input
          type="number"
          name="assists"
          value={player.assists}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Rebounds:
        <input
          type="number"
          name="rebounds"
          value={player.rebounds}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Field Goal Percentage:
        <input
          type="number"
          name="fieldGoalPercentage"
          value={player.fieldGoalPercentage}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>Three-Point Percentage:
        <input
          type="number"
          name="threePointPercentage"
          value={player.threePointPercentage}
          onChange={handleInputChange}
          required
        />
      </label>
      <div>
        <button type="submit">{player.id ? "Save Changes" : "Add Player"}</button>
        {player.id && (
          <button type="button" onClick={handleDelete}>
            Delete Player
          </button>
        )}
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// PlayerList Component
const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [result, setResult] = useState("");

  // Fetch players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const handleAddNewPlayer = () => {
    setEditingPlayer({});
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/players/${id}`, {
        method: "DELETE",
      });
      setPlayers(players.filter((player) => player.id !== id));
      setResult("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player:", error);
      setResult("Error deleting player");
    }
  };

  const handleSave = async (player) => {
    try {
      let response;
      if (player.id) {
        response = await fetch(`/api/players/${player.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        });
      } else {
        response = await fetch("/api/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(player),
        });
      }

      const savedPlayer = await response.json();
      if (player.id) {
        setPlayers(players.map((p) => (p.id === savedPlayer.id ? savedPlayer : p)));
      } else {
        setPlayers([...players, savedPlayer]);
      }
      setResult("Player saved successfully");
      setEditingPlayer(null);
    } catch (error) {
      console.error("Error saving player:", error);
      setResult("Error saving player");
    }
  };

  const handleCancel = () => {
    setEditingPlayer(null);
  };

  return (
    <div>
      <h1>Player List</h1>
      <button onClick={handleAddNewPlayer}>Add New Player</button>
      {result && <p>{result}</p>}
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <div>
              <p>{player.name}</p>
              <button onClick={() => handleEdit(player)}>Edit</button>
              <button onClick={() => handleDelete(player.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingPlayer !== null && (
        <PlayerForm
          playerToEdit={editingPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PlayerList;
