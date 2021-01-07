import React from "react";

function RecipeItem(recipe) {
  return (
    <div key={recipe.id} className="recipes-inner">
      {console.log("Hello")}
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
  );
}
export default RecipeItem;
