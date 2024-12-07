import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = ({ playerToEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        points_per_game: '',
        assists_per_game: '',
        rebounds_per_game: '',
        field_goal_percentage: '',
        three_point_percentage: '',
        team: '',
        position: '',
        image: null,
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (playerToEdit) {
            setFormData({
                name: playerToEdit.name,
                points_per_game: playerToEdit.points_per_game,
                assists_per_game: playerToEdit.assists_per_game,
                rebounds_per_game: playerToEdit.rebounds_per_game,
                field_goal_percentage: playerToEdit.field_goal_percentage,
                three_point_percentage: playerToEdit.three_point_percentage,
                team: playerToEdit.team,
                position: playerToEdit.position,
                image: playerToEdit.image || null,
            });
        } else {
            // Reset form data if no player to edit
            setFormData({
                name: '',
                points_per_game: '',
                assists_per_game: '',
                rebounds_per_game: '',
                field_goal_percentage: '',
                three_point_percentage: '',
                team: '',
                position: '',
                image: null,
            });
        }
    }, [playerToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            image: event.target.files[0],
        });
    };

    const validateForm = () => {
        if (
            !formData.name ||
            !formData.points_per_game ||
            !formData.assists_per_game ||
            !formData.rebounds_per_game ||
            !formData.field_goal_percentage ||
            !formData.three_point_percentage ||
            !formData.team ||
            !formData.position
        ) {
            setMessage('All fields are required');
            return false;
        }
        setMessage('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('points_per_game', formData.points_per_game);
        formDataToSend.append('assists_per_game', formData.assists_per_game);
        formDataToSend.append('rebounds_per_game', formData.rebounds_per_game);
        formDataToSend.append('field_goal_percentage', formData.field_goal_percentage);
        formDataToSend.append('three_point_percentage', formData.three_point_percentage);
        formDataToSend.append('team', formData.team);
        formDataToSend.append('position', formData.position);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            let response;
            if (playerToEdit) {
                // If editing, make PUT request
                response = await axios.put(`http://localhost:3001/api/players/${playerToEdit._id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // If adding new, make POST request
                response = await axios.post('http://localhost:3001/api/players', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            onSave(response.data);
        } catch (error) {
            setMessage('Error saving player data');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{playerToEdit ? 'Edit Player' : 'Add Player'}</h2>
            {message && <p>{message}</p>}
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Player Name"
            />
            <input
                type="number"
                name="points_per_game"
                value={formData.points_per_game}
                onChange={handleChange}
                placeholder="Points per game"
                min="0"
                step="0.1"
            />
            <input
                type="number"
                name="assists_per_game"
                value={formData.assists_per_game}
                onChange={handleChange}
                placeholder="Assists per game"
                min="0"
                step="0.1"
            />
            <input
                type="number"
                name="rebounds_per_game"
                value={formData.rebounds_per_game}
                onChange={handleChange}
                placeholder="Rebounds per game"
                min="0"
                step="0.1"
            />
            <input
                type="number"
                name="field_goal_percentage"
                value={formData.field_goal_percentage}
                onChange={handleChange}
                placeholder="Field Goal Percentage"
                min="0"
                max="100"
                step="0.1"
            />
            <input
                type="number"
                name="three_point_percentage"
                value={formData.three_point_percentage}
                onChange={handleChange}
                placeholder="3-Point Percentage"
                min="0"
                max="100"
                step="0.1"
            />
            <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Team"
            />
            <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
            />
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
            />
            {formData.image && (
                <div>
                    <p>Image Preview:</p>
                    <img src={URL.createObjectURL(formData.image)} alt="Player Preview" width="100" />
                </div>
            )}
            <button type="submit">{playerToEdit ? 'Update' : 'Add'} Player</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default PlayerForm;
