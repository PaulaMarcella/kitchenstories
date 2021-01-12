import "../styles/Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../actions/auth";
import { Fragment } from "react";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <NavLink activeClassName="active" to="/#recipes">
          Recipes
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/search">
          Search
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/profile">
          Profile
        </NavLink>
      </li>
      <li>
        <a className="btn" onClick={logout} href="!#">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink activeClassName="active" to="/search">
          Search
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/register">
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>kitchen stories</h1>
      </Link>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
