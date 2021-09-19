import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// page component
import Home from './page/Home';
import Login from './page/Login';
import Detail from './page/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:token" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
