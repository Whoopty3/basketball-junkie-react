import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Assuming Navbar.js is in the components folder
import Home from "./pages/Home"; // Assuming Home.js is in the pages folder
import Players from "./pages/Players"; // Assuming Players.js is in the pages folder
import Teams from "./pages/Teams"; // Assuming Teams.js is in the pages folder
import Analysis from "./pages/Analysis"; // Assuming Analysis.js is in the pages folder
import Contact from "./pages/Contact"; // Assuming Contact.js is in the pages folder
import ContactForm from "./components/ContactForm"; // Assuming ContactForm.js is in the components folder
import PlayerForm from "./components/PlayerForm"; // Assuming PlayerForm.js is in the components folder

const App = () => {
  return (
    <div>
      <Navbar /> {/* Navbar will be fixed at the top */}
      <div className="main-content"> {/* Main content wrapper */}
        <Routes>
          {/* Define the routes for each page */}
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/player-form" element={<PlayerForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
