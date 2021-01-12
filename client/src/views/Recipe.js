import React, { useEffect, Fragment } from "react";
import "../styles/Recipe.scss";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../actions/recipes";

import Spinner from "../layout/Spinner";

function Recipe({ getRecipeById, recipes: { loading, recipe } }) {
  const { recipeId } = useParams();
  useEffect(() => {
    getRecipeById(recipeId);
  }, [getRecipeById, recipeId]);
  return (
    <div className="recipe">
      <div
        className="recipe-header"
        style={{
          backgroundImage: recipe
            ? recipe.image
            : "https://www.kitchenstories.com/images/IMG_searchhero_tablet@2x.023258f0ce734037b9e6dcb220318d30.jpg"
        }}
      >
        <h1>Recipe Title</h1>
        <p>summary</p>
      </div>

      <div className="container">
        3
        {!loading ? (
          <div>
            {recipe ? (
              <Fragment>
                {console.log(recipe)}
                <h1>{recipe.title}</h1>
                <p>
                  <i className="fas fa-leaf"></i> Vegetarian
                </p>

                <p>
                  <i className="fas fa-heart"></i>{" "}
                  <span>{recipe.aggregateLikes}</span> Likes
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum similique nemo, facilis debitis in est ipsum placeat
                  perspiciatis tempore dolorem, architecto saepe fugiat
                  laboriosam minus minima ex nulla nihil cumque, quas dolore
                  quos voluptatibus enim dolorum temporibus! Commodi, odio
                  earum.
                </p>
                <br />
                <h4>Ingredients</h4>
                <ul>Lorem, ipsum.</ul>
                <ul>Lorem, ipsum.</ul>
                <ul>Lorem, ipsum.</ul>
                <ul>Lorem, ipsum.</ul>
                <br />
                <h4>Instructions</h4>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum, pariatur.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum, pariatur.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum, pariatur.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum, pariatur.
                  </li>
                </ol>
              </Fragment>
            ) : (
              <Fragment>
                {" "}
                <h2>
                  Sorry, This Recipe couldn't be found, try refreshing the
                  browser
                </h2>
              </Fragment>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getRecipeById })(Recipe);
