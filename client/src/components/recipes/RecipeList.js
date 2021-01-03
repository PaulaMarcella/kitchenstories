import React from "react";

function RecipeList() {
  return (
    <div className="container recipes bg-white">
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
  );
}
export default RecipeList;
