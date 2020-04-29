import axios from "axios"
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  LOADING_USER,
} from "../types/authTypes";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    baseURL: "https://bw-ft-sleep-tracker-1.herokuapp.com",
  });
};

export const registerUser = (credentials, redirect) => async (dispatch) => {
  try {
    const user = await axiosWithAuth().post("/api/users/register", credentials);
    dispatch({ type: REGISTER_USER, payload: user });
    // redirect();
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await axiosWithAuth().post("/api/users/login", credentials);
    dispatch({ type: LOGIN_USER, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};
