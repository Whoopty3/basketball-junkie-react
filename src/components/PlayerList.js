import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  // Fetch player data from the API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('https://basketball-junkie-backend.onrender.com/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <div>
      <h2>Players List</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            <h3>{player.name}</h3>
            <p>{player.team}</p>
            <p>{player.position}</p>
            <p>PPG: {player.points_per_game}</p>
            <p>APG: {player.assists_per_game}</p>
            <p>RPG: {player.rebounds_per_game}</p>
            <p>FG%: {player.field_goal_percentage}</p>
            <p>3P%: {player.three_point_percentage}</p>
            {player.main_image && (
              <img
                src={`https://basketball-junkie-backend.onrender.com/images/${player.main_image}`}
                alt={player.name}
                width="100"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
