import React, { Fragment, useEffect } from "react";
import "../../styles/Recipes.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Spinner from "../../layout/Spinner";

import { getRecipes } from "../../actions/recipes";

function RecipeList({ getRecipes, recipes: { recipes, loading } }) {
  // useEffect(() => {
  //   //getRecipes();
  // }, []);

  return (
    <div className="container recipes">
      <h2 className="py-1">Today's Recipes</h2>

      <Fragment>
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
      </Fragment>
    </div>
  );
}
RecipeList.propTypes = {
  getRecipes: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getRecipes })(RecipeList);
