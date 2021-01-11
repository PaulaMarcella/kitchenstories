import React, { useState } from "react";
import "../styles/Search.scss";

import { connect } from "react-redux";
import { searchRecipes } from "../actions/recipes";

function SearchBar({ searchRecipes, filterState }) {
  const { vegetarian, vegan, glutenfree, dairyfree } = filterState;
  const [query, setQuery] = useState(" ");
  const onSubmit = (event) => {
    const queryParams = {
      vegetarian,
      vegan,
      glutenfree,
      dairyfree
    };
    event.preventDefault();
    searchRecipes(query, queryParams);
  };

  return (
    <div className="container search">
      <h2 className="my-1">Find Recipes and More</h2>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          onChange={(event) => setQuery(event.target.value)}
          name="query"
          type="search"
          placeholder="Search a Ingredient... (seperated by Comma)"
          value={query}
        />
        <button type="submit" value="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
export default connect(null, { searchRecipes })(SearchBar);
