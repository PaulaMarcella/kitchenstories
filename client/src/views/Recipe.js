import "../styles/Recipe.scss";
import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../actions/recipes";

import Spinner from "../layout/Spinner";

import RecipeList from "../components/recipes/RecipeList";

function Recipe({ getRecipeById, recipes: { loading, recipe } }) {
  const { recipeId } = useParams();
  useEffect(() => {
    getRecipeById(recipeId);
  }, [getRecipeById, recipeId]);

  const getInstructions = () => {
    if (recipe.instructions === "") {
      return {
        __html: "<p>Sorry, this recipe does not have instructions.</p>"
      };
    } else {
      return { __html: recipe.instructions };
    }
  };

  return (
    <div className="recipe">
      <div
        className="recipe-header"
        style={{
          backgroundImage:
            'url("https://www.kitchenstories.com/images/IMG_searchhero_tablet@2x.023258f0ce734037b9e6dcb220318d30.jpg")'
        }}
        // style={{
        //   backgroundImage: recipe
        //     ? `url(${recipe.image})`
        //     : 'url("https://www.kitchenstories.com/images/IMG_searchhero_tablet@2x.023258f0ce734037b9e6dcb220318d30.jpg")'
        // }}
      >
        <h1 className="title-text">{!loading && recipe ? recipe.title : ""}</h1>
      </div>

      <div className="container">
        {!loading ? (
          <div className="recipe-main">
            {recipe ? (
              <Fragment>
                <div className="meta">
                  {/* <h2>{recipe.title}</h2> */}
                  <p>
                    <i className="fas fa-heart"></i>{" "}
                    <span>{recipe.aggregateLikes}</span> Likes
                  </p>
                  {recipe.vegetarian && (
                    <p>
                      <i className="fas fa-leaf"></i> Vegetarian{" "}
                    </p>
                  )}
                  {recipe.vegan && (
                    <p>
                      <i className="fas fa-seedling"></i> Vegan{" "}
                    </p>
                  )}
                  {recipe.glutenFree && (
                    <p>
                      <i className="fas fa-check"></i> Gluten Free{" "}
                    </p>
                  )}
                  {recipe.dairyFree && (
                    <p>
                      <i className="fas fa-check"></i> Dairy Free{" "}
                    </p>
                  )}
                </div>
                <div className="intro">
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          {Math.floor(ingredient.measures.metric.amount)}{" "}
                          {ingredient.measures.metric.unitShort}{" "}
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <img src={recipe.image} alt={recipe.title} />
                </div>

                <div className="instructions">
                  <h3>Instructions</h3>
                  <div dangerouslySetInnerHTML={getInstructions()}></div>
                </div>
                <RecipeList />
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
