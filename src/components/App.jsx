import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Navbar';
import 'bulma/css/bulma.css';
import Documentation from './Documentation';
import About from './About';
import Contact from './Contact';
import Report from './Report';
import Home from './Home';
import SingUp from './SingUp';
import SingIn from './SignIn';
import Garden from './Garden';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import addPlant from './addPlant';
import LoadingBar from 'react-redux-loading';
import IdentifyPlant from './IdentifyPlant';
import IdentifyPlantResults from './IdentifyPlantResults';

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <LoadingBar />
          <Switch>
            <Route path="/signup" component={SingUp} />
            <Route path="/signin" component={SingIn} />
            <Route path="/garden" component={Garden} />
            <Route path="/addplant" component={addPlant} />
            <Route path="/identifyPlant" component={IdentifyPlant} />
            <Route path="/identifiedPlant" component={IdentifyPlantResults} />
            <Route path="/documentation" component={Documentation} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/report" component={Report} />
            <Route exact path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authedUser === null,
  };
};

const mapDispatchToProps = {
  handleInitialData: handleInitialData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
