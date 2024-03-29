import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// page component
import Home from "./page/Home";
import Login from "./page/Login";
import Register from './page/Register';
import Detail from "./page/Detail";
import Favorite from "./page/Favorite";
import TvShow from "./page/TvShow";
import TvDetail from "./page/TvDetail";

function App() {
  return (
    <Router>
      <ScrollToTop>
      <Switch>
        <Route path="/detail/:token" component={Detail} />
        <Route path="/tvdetail/:token" component={TvDetail} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/tv" component={TvShow} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
