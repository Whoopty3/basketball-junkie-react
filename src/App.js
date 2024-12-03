import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar"; // Assuming Navbar.js is in the components folder
import Home from "./pages/Home"; // Assuming Home.js is in the pages folder
import Players from "./pages/Players"; // Assuming Players.js is in the pages folder
import Teams from "./pages/Teams"; // Assuming Teams.js is in the pages folder
import Analysis from "./pages/Analysis"; // Assuming Analysis.js is in the pages folder
import Contact from "./pages/Contact"; // Assuming Contact.js is in the pages folder
import ContactForm from "./components/ContactForm"; // Assuming ContactForm.js is in the components folder
import PlayerForm from "./components/PlayerForm"; // Assuming PlayerForm.js is in the components folder
import PlayerList from "./components/PlayerList"; // Assuming PlayerList.js is in the components folder

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* This will render the Navbar on every page */}
        
        <Switch>
          {/* Define the routes for each page */}
          <Route exact path="/" component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/contact" component={Contact} />
          <Route path="/contact-form" component={ContactForm} />
          
          {/* Add more routes for specific components if needed */}
          <Route path="/player-form" component={PlayerForm} />
          <Route path="/player-list" component={PlayerList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
