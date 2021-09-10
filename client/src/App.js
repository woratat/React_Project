import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// page component
import Home from './page/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} sensitive strict />
      </Switch>
    </Router>
  );
}

export default App;
