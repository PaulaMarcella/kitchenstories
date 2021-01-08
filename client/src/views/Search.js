import React, { Fragment } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipes/RecipeList";
function Search() {
  return (
    <Fragment>
      <SearchBar />
      <section className="bg-white">
        <RecipeList title={"Your Search Results for ..."} />
      </section>
    </Fragment>
  );
}

export default Search;
