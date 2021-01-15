import React, { Fragment, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipes/RecipeList";

import { connect } from "react-redux";
import { searchRecipes } from "../actions/recipes";

import Filter from "../components/Filter";

function Search({ searchRecipes, recipes: { loading, recipes } }) {
  const [showResults, setShowResults] = useState(false);
  const [filterState, setFilterState] = useState({
    vegetarian: false,
    vegan: false,
    glutenfree: false,
    dairyfree: false
  });
  const [query, setQuery] = useState(" ");
  const onSubmit = (event) => {
    console.log("Submitted query: ", query, "filterState:", filterState);
    event.preventDefault();
    searchRecipes(query, filterState).then(() => setShowResults(true));
  };
  return (
    <Fragment>
      <SearchBar
        filterState={filterState}
        setQuery={setQuery}
        query={query}
        onSubmit={onSubmit}
      />
      <section className="bg-white">
        <Filter filterState={filterState} setFilterState={setFilterState} />
        {showResults &&
          (recipes.length > 0 ? (
            <RecipeList title={`Your Search Results for ${query}`} />
          ) : (
            <div className="container">
              <h4 className="not-found-title">
                Sorry, no recipes found for "{query}"... Please try a different
                search term or adjust the filter.
              </h4>
            </div>
          ))}
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { searchRecipes })(Search);
