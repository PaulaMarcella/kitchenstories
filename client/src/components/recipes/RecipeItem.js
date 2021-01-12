import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
  const backgroundUrl = recipe.image
    ? recipe.image
    : "https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png";

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="recipe">
        <div
          className="img"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundUrl})`
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
    </Link>
  );
}
export default RecipeItem;
