import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjusted path to Navbar
import Footer from './components/Footer'; // Adjusted path to Footer
import Home from './pages/Home'; // Adjusted path to Home
import Players from './pages/Players'; // Adjusted path to Players
import Teams from './pages/Teams'; // Adjusted path to Teams
import Analysis from './pages/Analysis'; // Adjusted path to Analysis
import Contact from './pages/Contact'; // Adjusted path to Contact
import './styles/App.css'; // Import global styles from the correct path

function App() {
  return (
    <Router basename={process.env.NODE_ENV === 'development' ? '' : '/basketball-junkie-react'}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
