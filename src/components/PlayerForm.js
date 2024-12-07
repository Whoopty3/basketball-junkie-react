import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PlayerForm = (props) => {
  const [inputs, setInputs] = useState({
    name: '',
    team: '',
    position: '',
    pointsPerGame: '',
    assistsPerGame: '',
    reboundsPerGame: '',
    image: null,
  });
  const [result, setResult] = useState('');
  const [action, setAction] = useState('add'); // Default action is "add"
  
  const navigate = useNavigate();
  const { id } = useParams(); // Extract player ID for edit/delete

  // Handle form input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle image file input
  const handleImageChange = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Fetch player data for editing
  useEffect(() => {
    if (id) {
      setAction('edit'); // Change action to "edit" if an ID is present
      fetch(`https://basketball-junkie-backend.onrender.com/api/players/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setInputs({
            name: data.name,
            team: data.team,
            position: data.position,
            pointsPerGame: data.pointsPerGame,
            assistsPerGame: data.assistsPerGame,
            reboundsPerGame: data.reboundsPerGame,
            image: null,
          });
        })
        .catch((error) => {
          setResult('Error loading player data');
          console.error(error);
        });
    }
  }, [id]);

  // Handle form submission (Add, Edit, or Delete)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });

    let response;
    if (action === 'add') {
      // Add player (POST request)
      response = await fetch('https://basketball-junkie-backend.onrender.com/api/players', {
        method: 'POST',
        body: formData,
      });
    } else if (action === 'edit') {
      // Edit player (PUT request)
      response = await fetch(
        `https://basketball-junkie-backend.onrender.com/api/players/${id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
    } else if (action === 'delete') {
      // Delete player (DELETE request)
      response = await fetch(
        `https://basketball-junkie-backend.onrender.com/api/players/${id}`,
        {
          method: 'DELETE',
        }
      );
    }

    if (response.status === 200) {
      if (action === 'add') {
        setResult('Player successfully added!');
      } else if (action === 'edit') {
        setResult('Player successfully updated!');
      } else if (action === 'delete') {
        setResult('Player successfully deleted!');
      }

      navigate('/players'); // Redirect to players list page
    } else {
      setResult('Error processing the request');
    }
  };

  return (
    <div id="player-form">
      <h1>{action === 'add' ? 'Add Player' : action === 'edit' ? 'Edit Player' : 'Delete Player'}</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={inputs.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="team">Team:</label>
          <input
            type="text"
            id="team"
            name="team"
            required
            value={inputs.team}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            required
            value={inputs.position}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="pointsPerGame">Points per Game:</label>
          <input
            type="number"
            id="pointsPerGame"
            name="pointsPerGame"
            required
            value={inputs.pointsPerGame}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="assistsPerGame">Assists per Game:</label>
          <input
            type="number"
            id="assistsPerGame"
            name="assistsPerGame"
            required
            value={inputs.assistsPerGame}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="reboundsPerGame">Rebounds per Game:</label>
          <input
            type="number"
            id="reboundsPerGame"
            name="reboundsPerGame"
            required
            value={inputs.reboundsPerGame}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </p>
        {action !== 'delete' && (
          <p>
            <button type="submit">
              {action === 'add' ? 'Add Player' : 'Update Player'}
            </button>
          </p>
        )}
        {action === 'delete' && (
          <p>
            <button type="submit">Delete Player</button>
          </p>
        )}
      </form>
      <p>{result}</p>
    </div>
  );
};

export default PlayerForm;
