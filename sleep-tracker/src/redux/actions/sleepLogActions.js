import axios from "axios";
import {
  FETCH_LOGS,
  LOADING_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
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
export const getLogs = () => async dispatch => {
  let userId = JSON.parse(localStorage.getItem(userId))
  try {
    const sleeplog = await axiosWithAuth().get(`/api/sleep/${userId}`);

  }catch(err) {
    console.log(err.message);
  }
}