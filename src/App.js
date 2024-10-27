import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          {/* Define the routes for your app */}
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/contact" component={Contact} />
          {/* You can add a fallback Route to redirect to home if none of the above match */}
          <Route component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
