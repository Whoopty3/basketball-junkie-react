import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import Players from './pages/Players'; 
import Teams from './pages/Teams'; 
import Analysis from './pages/Analysis'; 
import Contact from './pages/Contact'; 
import ContactForm from './components/ContactForm'; 
import ParentComponent from './components/ParentComponent';  // Import ParentComponent
import PlayerForm from './components/PlayerForm';  // Import PlayerForm

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

          {/* Routes for ParentComponent */}
          <Route path="/parent-component" element={<ParentComponent />} /> {/* Route to ParentComponent */}
          
          {/* Routes for PlayerForm */}
          <Route path="/player-form" element={<PlayerForm />} /> {/* This is for adding or editing player */}
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
