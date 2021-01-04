import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import recipes from "./recipes";

export default combineReducers({
  auth,
  alert,
  recipes
});
