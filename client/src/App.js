import "./styles/App.scss";

import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./layout/Nabvar";
import Alert from "./layout/Alert";

// Views
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Search from "./views/Search";
import Profile from "./views/Profile";
import Recipe from "./views/Recipe";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utilities/setAuthToken";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/recipe/:recipeId" component={Recipe} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
