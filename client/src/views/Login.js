import "../styles/forms.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { email, password } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <section className="container">
      <h1 className="large">Log In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Log in to your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
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
            required
          />
        </div>
        <input type="submit" value="Login" className="btn" />
      </form>
      <p className="my-1">
        No account?<Link to="/register"> Sign up here.</Link>
      </p>
    </section>
  );
}

Login.propTypes = {};

export default Login;
