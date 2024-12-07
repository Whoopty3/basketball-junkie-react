import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerForm from './PlayerForm';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get('https://basketball-junkie-backend.onrender.com/api/players');
            setPlayers(response.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://basketball-junkie-backend.onrender.com/api/players/${id}`);
            setPlayers(players.filter(player => player._id !== id));
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const handleEdit = (player) => {
        setEditingPlayer(player);
    };

    const handleSave = (updatedPlayer) => {
        setPlayers(players.map(player => player._id === updatedPlayer._id ? updatedPlayer : player));
        setEditingPlayer(null);
    };

    const handleCancel = () => {
        setEditingPlayer(null);
    };

    return (
        <div>
            <h1>Player List</h1>
            {editingPlayer ? (
                <PlayerForm playerToEdit={editingPlayer} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <button onClick={() => setEditingPlayer({})}>Add New Player</button>
            )}
            <ul>
                {players.map(player => (
                    <li key={player._id}>
                        <h3>{player.name}</h3>
                        <p>{player.team} - {player.position}</p>
                        <button onClick={() => handleEdit(player)}>Edit</button>
                        <button onClick={() => handleDelete(player._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
