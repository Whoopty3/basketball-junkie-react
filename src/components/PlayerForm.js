const PlayerForm = ({ setPlayers, playerToUpdate }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch("https://basketball-junkie-backend.onrender.com/api/players", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        const newPlayer = await response.json();
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      } else {
        console.error("Error adding player");
      }
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const handleUpdate = async (playerId) => {
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${playerId}`, {
        method: "PUT",
        body: formDataObj,
      });

      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === playerId ? updatedPlayer : player
          )
        );
      } else {
        console.error("Error updating player");
      }
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handleDelete = async (playerId) => {
    try {
      const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${playerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
      } else {
        console.error("Error deleting player");
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <label>Team:</label>
      <input type="text" name="team" onChange={handleChange} />
      <label>Position:</label>
      <input type="text" name="position" onChange={handleChange} />
      <label>Points per Game:</label>
      <input type="number" name="points_per_game" onChange={handleChange} />
      <label>Assists per Game:</label>
      <input type="number" name="assists_per_game" onChange={handleChange} />
      <label>Rebounds per Game:</label>
      <input type="number" name="rebounds_per_game" onChange={handleChange} />
      <label>Field Goal Percentage:</label>
      <input type="number" name="field_goal_percentage" onChange={handleChange} />
      <label>Three-Point Percentage:</label>
      <input type="number" name="three_point_percentage" onChange={handleChange} />
      <label>Image:</label>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Player</button>
      {playerToUpdate && (
        <>
          <button type="button" onClick={() => handleUpdate(playerToUpdate.id)}>
            Update Player
          </button>
          <button type="button" onClick={() => handleDelete(playerToUpdate.id)}>
            Delete Player
          </button>
        </>
      )}
    </form>
  );
};
