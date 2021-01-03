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

      <section>
        <div className="container search">
          <h2 className="my-1">Find Recipes and More</h2>
          <form>
            <input type="search" placeholder="Search a Recipe..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white">
        <div className="container recipes">
          <h2 className="py-1">Today's Recipes</h2>
          <div className="recipes-inner">
            <div className="recipe">
              <div
                className="img"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png")`
                }}
              >
                <div className="body">
                  <p>Title</p>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div />
      </section>
    </Fragment>
  );
}

export default Home;
