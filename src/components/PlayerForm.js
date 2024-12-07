import React, { useState, useEffect } from "react";

const PlayerForm = ({ player, setPlayers, setIsEditing, setMessage }) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [position, setPosition] = useState("");
  const [pointsPerGame, setPointsPerGame] = useState("");
  const [assistsPerGame, setAssistsPerGame] = useState("");
  const [reboundsPerGame, setReboundsPerGame] = useState("");
  const [fieldGoalPercentage, setFieldGoalPercentage] = useState("");
  const [threePointPercentage, setThreePointPercentage] = useState("");

  useEffect(() => {
    if (player) {
      setName(player.name || "");
      setTeam(player.team || "");
      setPosition(player.position || "");
      setPointsPerGame(player.points_per_game || "");
      setAssistsPerGame(player.assists_per_game || "");
      setReboundsPerGame(player.rebounds_per_game || "");
      setFieldGoalPercentage(player.field_goal_percentage || "");
      setThreePointPercentage(player.three_point_percentage || "");
    }
  }, [player]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = {
      name,
      team,
      position,
      points_per_game: Number(pointsPerGame),
      assists_per_game: Number(assistsPerGame),
      rebounds_per_game: Number(reboundsPerGame),
      field_goal_percentage: Number(fieldGoalPercentage),
      three_point_percentage: Number(threePointPercentage),
    };

    try {
      let response;
      if (player) {
        response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${player._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(playerData),
        });
      } else {
        response = await fetch("https://basketball-junkie-backend.onrender.com/api/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(playerData),
        });
      }

      if (response.ok) {
        const updatedPlayer = await response.json();
        if (player) {
          setPlayers((prev) =>
            prev.map((p) => (p._id === updatedPlayer._id ? updatedPlayer : p))
          );
          setMessage("Player updated successfully.");
        } else {
          setPlayers((prev) => [...prev, updatedPlayer]);
          setMessage("Player added successfully.");
        }
        setIsEditing(false);
      } else {
        setMessage("Failed to save player data.");
      }
    } catch (error) {
      console.error("Error saving player:", error);
      setMessage("Error saving player data.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Team" />
      <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
      <input
        value={pointsPerGame}
        onChange={(e) => setPointsPerGame(e.target.value)}
        placeholder="Points Per Game"
        type="number"
      />
      <input
        value={assistsPerGame}
        onChange={(e) => setAssistsPerGame(e.target.value)}
        placeholder="Assists Per Game"
        type="number"
      />
      <input
        value={reboundsPerGame}
        onChange={(e) => setReboundsPerGame(e.target.value)}
        placeholder="Rebounds Per Game"
        type="number"
      />
      <input
        value={fieldGoalPercentage}
        onChange={(e) => setFieldGoalPercentage(e.target.value)}
        placeholder="Field Goal %"
        type="number"
      />
      <input
        value={threePointPercentage}
        onChange={(e) => setThreePointPercentage(e.target.value)}
        placeholder="3-Point %"
        type="number"
      />
      <button type="submit">{player ? "Update Player" : "Add Player"}</button>
    </form>
  );
};

export default PlayerForm;
