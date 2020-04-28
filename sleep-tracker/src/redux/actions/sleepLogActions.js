import axios from "axios";
import {
  FETCH_LOGS,
  LOADING_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  POST_LOG,
  ERR_LOG,
} from "../types/sleepLogTypes";

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

export const getLogs = () => async (dispatch) => {
  dispatch({ type: LOADING_LOGS });
  let userId = JSON.parse(localStorage.getItem(userId));
  try {
    const sleepLog = await axiosWithAuth().get(`/api/sleep/${userId}`);
    dispatch({ type: FETCH_LOGS, payload: sleepLog });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};

export const createLog = (logInputs) => async (dispatch) => {
  try {
    const newLog = await axiosWithAuth().post(`/api/sleep`, logInputs);
    dispatch({ type: POST_LOG, payload: newLog });
  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};
