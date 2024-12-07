import React, { useState } from 'react';

const PlayerForm = ({ addPlayer }) => {
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        team: '',
        points: '',
        assists: '',
        rebounds: '',
        fieldGoalPercentage: '',
        threePointPercentage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer({
            ...newPlayer,
            [name]: value
        });
    };

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlayer),
            });

            if (response.ok) {
                const player = await response.json();
                addPlayer(player); // Add the new player to the list
                setNewPlayer({ name: '', team: '', points: '', assists: '', rebounds: '', fieldGoalPercentage: '', threePointPercentage: '' }); // Clear the form
            } else {
                alert('Failed to add player');
            }
        } catch (error) {
            console.error('Error adding player:', error);
            alert('An error occurred while adding the player');
        }
    };

    return (
        <div>
            <h2>Add Player</h2>
            <form onSubmit={handleAddPlayer}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={newPlayer.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Team: </label>
                    <input
                        type="text"
                        name="team"
                        value={newPlayer.team}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Points: </label>
                    <input
                        type="number"
                        name="points"
                        value={newPlayer.points}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Assists: </label>
                    <input
                        type="number"
                        name="assists"
                        value={newPlayer.assists}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Rebounds: </label>
                    <input
                        type="number"
                        name="rebounds"
                        value={newPlayer.rebounds}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Field Goal %: </label>
                    <input
                        type="number"
                        name="fieldGoalPercentage"
                        value={newPlayer.fieldGoalPercentage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>3P %: </label>
                    <input
                        type="number"
                        name="threePointPercentage"
                        value={newPlayer.threePointPercentage}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default PlayerForm;
