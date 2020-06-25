import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Navbar';
import 'bulma/css/bulma.css';
import Documentation from './Documentation';
import About from './About';
import Contact from './Contact';
import Report from './Report';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/documentation" component={Documentation} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/report" component={Report} />
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
