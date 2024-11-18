import React, { useEffect, useState } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch player data from the backend
    fetch('https://basketball-junkie-backend.onrender.com')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Player List</h1>
      <div className="player-container">
        {players.map((player, index) => (
          <div key={index} className="player-card">
            <h2>{player.name}</h2>
            <p>Team: {player.team}</p>
            <p>Points per game: {player.points}</p>
            <p>Assists per game: {player.assists}</p>
            <p>Rebounds per game: {player.rebounds}</p>
            <p>Field Goal %: {player.fieldGoalPercentage}</p>
            <p>3-Point %: {player.threePointPercentage}</p>
            {player.image && (
              <img
                src={`https://basketball-junkie-backend.onrender.com/images/${player.image}`}
                alt={player.name}
                className="player-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
