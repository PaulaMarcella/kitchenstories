import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

import { setAlert } from "./alert";

//Register User

export const register = ({ username, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    if (err.response.data.errors) {
      err.response.data.errors.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
