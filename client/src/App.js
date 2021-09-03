import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useBody } from './use';

function Home() {
  const [test, setTest] = useState('tat');
  useBody(test);

  return (
    <div>
      <h1>Tat</h1>
      <button type="button" onClick={() => setTest('tat2')}>Click</button>
      <Link to="/about">About</Link>
    </div>
  )
}

function About() {
  useBody('tum');
  return (
    <div>
      <h1>tum</h1>
      <Link to="/">Home</Link>
    </div>
  )
}

function Error() {
  return (
    <div>
      <h1>Error</h1>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
