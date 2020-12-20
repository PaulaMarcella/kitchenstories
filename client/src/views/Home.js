import "../styles/Home.scss";

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <div className="header">
        <div className="header-inner">
          <h1 className="x-large">
            kitchen stories<span className="yellow-dot">.</span>
          </h1>
          <p className="lead">Discover share and search new Recipes</p>

          <Link className="btn" to="/register">
            Sign Up
          </Link>
          <Link to="/login">
            <p className="white-text my-1">Or Login to your Account Login</p>
          </Link>

          <div className="buttons"></div>
        </div>
      </div>
      <div className="recipes-container">
        <div className="recipe">
          RECIPE
          <h6 className="title">Potato Mash</h6>
          <a href="/">More Details</a>
        </div>
        <div className="recipe">
          RECIPE
          <h6 className="title">Potato Mash</h6>
          <a href="/">More Details</a>
        </div>
        <div className="recipe">
          RECIPE
          <h6 className="title">Potato Mash</h6>
          <a href="/">More Details</a>
        </div>
        <div className="recipe">
          RECIPE
          <h6 className="title">Potato Mash</h6>
          <a href="/">More Details</a>
        </div>
        <div className="recipe">
          RECIPE
          <h6 className="title">Potato Mash</h6>
          <a href="/">More Details</a>
        </div>
      </div>
      <div />
    </Fragment>
  );
}

export default Home;
