import axios from "axios";
import {
  GET_RECIPES,
  RECIPE_ERROR,
  SEARCH_RECIPES,
  GET_ONERECIPE
} from "./types";

// Get all Recipes from spoon API
export const getRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/spoonapi/all");
    dispatch({
      type: GET_RECIPES,
      payload: res.data.recipes
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search  Recipes from spoon API
export const searchRecipes = (query, params) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/spoonapi/search/${query}`, { params });
    console.log(res.data);
    dispatch({
      type: SEARCH_RECIPES,
      payload: res.data.results
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get One by id  Recipes from spoon API
export const getRecipeById = (recipeId) => async (dispatch) => {
  try {
    const res =
      recipeId.length === 6
        ? await axios.get(`/api/spoonapi/${recipeId}`)
        : await axios.get(`/api/recipes/details/${recipeId}`);
    dispatch({
      type: GET_ONERECIPE,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
