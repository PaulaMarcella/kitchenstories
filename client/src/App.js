import "./styles/App.scss";

import { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./layout/Nabvar";
import Alert from "./layout/Alert";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
