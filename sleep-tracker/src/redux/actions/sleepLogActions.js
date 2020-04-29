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
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJpYXQiOjE1ODgxMTg2NDMsImV4cCI6MTU4ODcyMzQ0M30.QOQFb5ktw8clFvL21TVdeu6pWvai4YTlgiSp2kjhF3o",
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
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};

export const createLog = (logInputs) => async (dispatch) => {
  try {
    const newLog = await axiosWithAuth().post(`/api/sleep`, logInputs);
    dispatch({ type: POST_LOG, payload: newLog.data });
  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};

export const deleteLog = (logId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LOG, payload: logId });
  } catch (err) {
    dispatch({ type: ERR_LOG, payload: err.message });
  }
};
