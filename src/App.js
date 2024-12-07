import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import Players from './pages/Players'; 
import Teams from './pages/Teams'; 
import Analysis from './pages/Analysis'; 
import Contact from './pages/Contact'; 
import ContactForm from './components/ContactForm'; 
import ParentComponent from './components/ParentComponent'; // Import ParentComponent
import PlayerForm from './components/PlayerForm'; // Import PlayerForm (handles add, edit, delete functionality)

const App = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          
          {/* Route for the PlayerForm (handles add, edit, and delete functionality) */}
          <Route path="/add-player" element={<PlayerForm />} /> {/* Route to AddPlayer */}
          <Route path="/edit-player/:id" element={<PlayerForm />} /> {/* Route to EditPlayer with dynamic player ID */}
          <Route path="/delete-player/:id" element={<PlayerForm />} /> {/* Route to DeletePlayer with dynamic player ID */}

          <Route path="/player-form" element={<ParentComponent />} /> {/* Use ParentComponent for the player form */}
        </Routes>
      </div>
      <div>
        {message && <p>{message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default App;
