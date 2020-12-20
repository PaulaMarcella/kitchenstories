import "./styles/App.scss";

import { Fragment } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./layout/Nabvar";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navbar />
      <Switch>
        <Route eaxt path="/" component={Home} />
        <Route eaxt path="/register" component={Register} />
        <Route eaxt path="/login" component={Login} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
