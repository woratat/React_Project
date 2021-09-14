import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// page component
import Home from './page/Home';
import Detail from './page/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:token" component={Detail} />
        <Route path="/" component={Home} sensitive strict />
      </Switch>
    </Router>
  );
}

export default App;
