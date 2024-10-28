import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
import Players from './pages/Players';
import Teams from './pages/Teams';
import Analysis from './pages/Analysis';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
