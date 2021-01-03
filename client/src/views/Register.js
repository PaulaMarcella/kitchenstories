import "../styles/forms.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";

function Register({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <section className="container">
      <h1 className="large">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            name="username"
            value={username}
            onChange={(event) => onChange(event)}
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            type="password"
            placeholder="Password"
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            name="password2"
            value={password2}
            onChange={(event) => onChange(event)}
            type="password"
            placeholder="Confirm Password"
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" className="btn" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </section>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
