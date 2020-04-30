import axios from "axios";
import {
  FETCH_LOGS,
  LOADING_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  POST_LOG,
  ERR_LOG,
} from "../types/sleepLogTypes";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    baseURL: "https://bw-ft-sleep-tracker-1.herokuapp.com/",
  });
};

export const getLogs = () => async (dispatch) => {
  dispatch({ type: LOADING_LOGS });
  try {
    const sleepLog = await axiosWithAuth().get(`/api/sleep/`);
    dispatch({ type: FETCH_LOGS, payload: sleepLog.data });
    console.log("response from get request", sleepLog.data);
  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};

export const createLog = (logInputs) => async (dispatch) => {
  try {
    const newLog = await axiosWithAuth().post(`/api/sleep`, logInputs);
    console.log("post request", newLog.data);
    dispatch({ type: POST_LOG, payload: newLog.data });

  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};

export const deleteLog = (logId) => async (dispatch) => {
  try {
    const response = await axiosWithAuth().delete(`api/sleep/${logId}`);
    console.log(response);
    dispatch({ type: DELETE_LOG, payload: logId });
  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};
