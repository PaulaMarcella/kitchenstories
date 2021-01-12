import {
  GET_RECIPES,
  RECIPE_ERROR,
  SEARCH_RECIPES,
  GET_ONERECIPE
} from "../actions/types";

const initialState = {
  recipes: [],
  recipe: null,
  loading: true,
  error: {}
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_RECIPES:
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case GET_ONERECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case RECIPE_ERROR:
      return {
        ...state,
        recipes: [],
        recipe: null,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
