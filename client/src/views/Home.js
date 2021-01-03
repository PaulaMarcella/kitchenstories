import "../styles/Home.scss";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Search from "../components/Search";
import RecipeList from "../components/recipes/RecipeList";

function Home({ auth: { isAuthenticated, loading, user } }) {
  const guestHeader = (
    <Fragment>
      <p className="lead">Discover share and search new Recipes</p>
      <Link className="btn" to="/register">
        Sign Up
      </Link>
      <Link to="/login">
        <p className="white-text my-1">Or Login to your Account Login</p>
      </Link>
    </Fragment>
  );
  const authHeader = (
    <Fragment>
      <p className="lead">Welcome to your Kitchenstory, {user.username}! </p>
      <p className="lead">Discover Share and Search New Recipes</p>
      <i className="fas fa-angle-down"></i>
    </Fragment>
  );
  return (
    <Fragment>
      <div className="header">
        <div className="header-inner">
          <h1 className="x-large">
            kitchen stories<span className="yellow-dot">.</span>
          </h1>
          {!loading && (
            <Fragment>{isAuthenticated ? authHeader : guestHeader}</Fragment>
          )}
        </div>
      </div>

      <Search />

      <RecipeList />
    </Fragment>
  );
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
