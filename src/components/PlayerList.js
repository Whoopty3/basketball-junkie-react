import React, { useState, useEffect } from 'react';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);

    // Fetch players from the backend API on component mount
    useEffect(() => {
        fetchPlayers();
    }, []);

    // Function to fetch players from the backend API
    const fetchPlayers = async () => {
        try {
            const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players');
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    // Function to handle deleting a player
    const handleDeletePlayer = async (id) => {
        try {
            const response = await fetch(`https://basketball-junkie-backend.onrender.com/api/players/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Player deleted successfully!');
                fetchPlayers(); // Refresh the player list
            } else {
                alert('Failed to delete player');
            }
        } catch (error) {
            console.error('Error deleting player:', error);
            alert('An error occurred while deleting the player');
        }
    };

    return (
        <div>
            <h2>Player List</h2>
            <div>
                {players.length > 0 ? (
                    players.map((player) => (
                        <div key={player._id} className="player">
                            <h3>{player.name}</h3>
                            <p>Team: {player.team}</p>
                            <p>Points: {player.points}</p>
                            <p>Assists: {player.assists}</p>
                            <p>Rebounds: {player.rebounds}</p>
                            <p>FG%: {player.fieldGoalPercentage}</p>
                            <p>3P%: {player.threePointPercentage}</p>
                            <button onClick={() => handleDeletePlayer(player._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No players found.</p>
                )}
            </div>
        </div>
    );
};

export default PlayerList;
