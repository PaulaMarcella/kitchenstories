import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../actions/auth";
import { Fragment } from "react";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/#recipes">Recipes</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
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
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
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
