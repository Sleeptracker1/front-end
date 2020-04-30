import {axiosWithAuth} from "../../utils/axiosWithAuth";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  LOADING_USER,
} from "../types/authTypes";



export const registerUser = (credentials, redirect) => async (dispatch) => {
  try {
    const user = await axiosWithAuth().post("/api/users/register", credentials);
    dispatch({ type: REGISTER_USER, payload: user });
    redirect();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};
export const loginUser = (credentials, redirect) => async (dispatch) => {
  try {
    const user = await axiosWithAuth().post("/api/users/login", credentials);
    dispatch({ type: LOGIN_USER, payload: user.data });
    localStorage.setItem("token", user.data.token);
    redirect();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};
