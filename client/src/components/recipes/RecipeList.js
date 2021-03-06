import React from "react";
import "../../styles/Recipes.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import RecipeItem from "./RecipeItem";

function RecipeList({ recipes: { recipes, loading }, title }) {
  console.log(recipes);
  return (
    <div className="container recipes">
      <h2 className="py-1">{title}</h2>
      {!loading ? (
        recipes.length > 0 && (
          <div className="recipes-inner">
            {recipes.map((recipe, index) => (
              <RecipeItem recipe={recipe} index={index} key={recipe.id} />
            ))}
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}
RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps)(RecipeList);
