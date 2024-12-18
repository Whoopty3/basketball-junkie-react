import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home'; 
import Players from './pages/Players'; 
import Teams from './pages/Teams'; 
import Analysis from './pages/Analysis'; 
import Contact from './pages/Contact'; 
import ContactForm from './components/ContactForm';   
import PlayerForm from './components/PlayerForm'; 
import PlayerList from './components/PlayerList'; // Import PlayerList

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
          
          {/* Route for PlayerForm */}
          <Route path="/player-form" element={<PlayerForm />} />
          
          {/* Route for PlayerList */}
          <Route path="/player-list" element={<PlayerList />} />
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
