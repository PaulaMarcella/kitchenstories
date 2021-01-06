import axios from "axios";
import { GET_RECIPES, RECIPE_ERROR } from "./types";

// Get all Recipes from external API
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
