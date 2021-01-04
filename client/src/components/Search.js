import React from "react";
import "../styles/Search.scss";

function Search() {
  return (
    <div className="container search">
      <h2 className="my-1">Find Recipes and More</h2>
      <form>
        <input type="search" placeholder="Search a Recipe..." />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
export default Search;
