import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        {/* Navbar at the top */}
        <Navbar />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />           {/* Home page */}
          <Route path="/players" element={<Players />} /> {/* Players page */}
          <Route path="/teams" element={<Teams />} />     {/* Teams page */}
          <Route path="/analysis" element={<Analysis />} />{/* Analysis page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="*" element={<Home />} />           {/* Redirect unknown routes to Home */}
        </Routes>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
