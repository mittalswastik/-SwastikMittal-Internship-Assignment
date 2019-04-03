import React, { Component } from 'react';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import { Router, Route, BrowserRouter, Switch, exact } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Page1} />
          <Route path="/page2" component={Page2} /> 
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
