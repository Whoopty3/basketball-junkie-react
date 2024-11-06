// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; // Import the Navbar
import Home from './pages/Home';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Analysis from './pages/Analysis';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Navbar />  {/* This will display the Navbar on all pages */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="players" element={<Players />} />
          <Route path="teams" element={<Teams />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
