import React, { Fragment, useEffect } from "react";
import "../../styles/Recipes.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
// import RecipeItem from "./RecipeItem";

import { getRecipes } from "../../actions/recipes";

function RecipeList({ getRecipes, recipes: { recipes, loading } }) {
  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="container recipes">
      <h2 className="py-1">Today's Recipes</h2>
      {console.log(recipes)}
      {!loading ? (
        recipes.length > 0 && (
          <Fragment>
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipes-inner">
                <div className="recipe">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${recipe.image})`
                    }}
                  >
                    <div className="body">
                      <p>{recipe.title}</p>
                      <div>
                        <span>{recipe.aggregateLikes}</span>{" "}
                        <i className="far fa-heart"></i>
                        {recipe.vegetarian && <i className="fas fa-leaf"></i>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}
RecipeList.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getRecipes })(RecipeList);
