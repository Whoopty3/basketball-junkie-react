// App.js
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
import AddPlayer from './components/AddPlayer'; // Import AddPlayer component
import EditPlayer from './components/EditPlayer'; // Import EditPlayer component
import DeletePlayer from './components/DeletePlayer'; // Import DeletePlayer component

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
          
          {/* Add routes for AddPlayer, EditPlayer, and DeletePlayer */}
          <Route path="/add-player" element={<AddPlayer />} /> {/* Route to AddPlayer */}
          <Route path="/edit-player/:id" element={<EditPlayer />} /> {/* Route to EditPlayer with dynamic player ID */}
          <Route path="/delete-player" element={<DeletePlayer />} /> {/* Route to DeletePlayer */}

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
