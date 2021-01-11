import React, { Fragment, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipes/RecipeList";

import Filter from "../components/Filter";

function Search() {
  const [filterState, setFilterState] = useState({
    vegetarian: false,
    vegan: false,
    glutenfree: false,
    dairyfree: false
  });
  return (
    <Fragment>
      <SearchBar filterState={filterState} />
      <section className="bg-white">
        <Filter filterState={filterState} setFilterState={setFilterState} />
        <RecipeList title={"Your Search Results for ..."} />
      </section>
    </Fragment>
  );
}

export default Search;
