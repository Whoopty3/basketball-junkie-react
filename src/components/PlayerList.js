import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  // Fetch the list of players from the API
  useEffect(() => {
    fetch('https://basketball-junkie-backend.onrender.com/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  // Handle add new player
  const handlePlayerAdd = (newPlayer) => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  return (
    <div>
      <h2>Player List</h2>
      <PlayerForm onPlayerAdd={handlePlayerAdd} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Position</th>
            <th>Points per Game</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.pointsPerGame}</td>
              <td>
                <Link to={`/edit/${player.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
