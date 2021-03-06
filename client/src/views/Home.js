import "../styles/Home.scss";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes } from "../actions/recipes";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipes/RecipeList";

function Home({ getRecipes, auth: { isAuthenticated, loading, user } }) {
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);
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
      <p className="lead">Welcome to your Kitchenstory! </p>
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

      <SearchBar />

      <section className="bg-white">
        <RecipeList title={"Today's Recipes"} />
      </section>
    </Fragment>
  );
}

Home.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getRecipes })(Home);
