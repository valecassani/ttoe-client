import React from 'react';
import {  Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

import Game from './views/Game';
import Config from './views/Config';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Switch>
          <Route path="/:gameId" render={props => <Game {...props} />} >
          </Route>
          <Route path="/">
            <Config />
          </Route>
        </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
