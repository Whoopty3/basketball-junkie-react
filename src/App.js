import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/analysis" component={Analysis} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
