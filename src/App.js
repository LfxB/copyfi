import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Copy from './Pages/Copy';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/copy" exact component={Copy} />
        </Switch>
      </Router>
    );
  }
}

export default App;
