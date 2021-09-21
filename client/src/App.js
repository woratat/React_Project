import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";

// page component
import Home from "./page/Home";
import Login from "./page/Login";
import Detail from "./page/Detail";
import Favorite from "./page/Favorite";
import TvShow from "./page/TvShow";
import TvDetail from "./page/TvDetail";

function App() {
  return (
    <Router>
      <ScrollToTop>
      <Switch>
        <Route path="/detail/:token" component={Detail} sensitive strict />
        <Route path="/tvdetail/:token" component={TvDetail} sensitive strict />
        <Route path="/favorite" component={Favorite} sensitive strict />
        <Route path="/tv" component={TvShow} sensitive strict />
        <Route path="/login" component={Login} sensitive strict />
        <Route path="/" component={Home} sensitive strict />
      </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
