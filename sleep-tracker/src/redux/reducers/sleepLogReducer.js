import { createReducer } from "./reducerUtil";
import {
  FETCH_LOGS,
  LOADING_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  ERR_LOG,
  POST_LOG,
} from "../types/sleepLogTypes";

const initialState = {
  sleepLog: [],
  isLoading: false,
  errorLog: "",
};

const fetchLogs = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      sleepLog: payload,
      isLoading: false,
    };
  }
};
const createLog = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      sleepLog: [...state.sleepLog, payload],
    };
  }
};
const loadingLogs = (state = initialState, payload) => {
  return {
    ...state,
    isLoading: true,
  };
};
const errorLoading = (state = initialState, payload) => {
  return {
    ...state,
    isLoading: false,
    errorLog: payload,
  };
};
const updateLog = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      //update log state here
    };
  }
};

const deleteLog = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      //update logs state here
    };
  }
};

export default createReducer(initialState, {
  [FETCH_LOGS]: fetchLogs,
  [LOADING_LOGS]: loadingLogs,
  [ERR_LOG]: errorLoading,
  [UPDATE_LOG]: updateLog,
  [DELETE_LOG]: deleteLog,
  [POST_LOG]: createLog,
});
