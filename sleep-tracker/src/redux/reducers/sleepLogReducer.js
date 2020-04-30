import { createReducer } from "./reducerUtil";
import {
  FETCH_LOGS,
  LOADING_LOGS,
  DELETE_LOG,
  UPDATE_LOG,
  ERR_LOG,
  POST_LOG,
  START_UPDATE,
} from "../types/sleepLogTypes";

const initialState = {
  sleepLog: [],
  isLoading: false,
  errorLog: "",
  editing: false,
  logToEdit: {},
};

const fetchLogs = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      sleepLog: payload,
      isLoading: false,
      editing: false,
      logToEdit: {},
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
const startUpdate = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      editing: true,
      logToEdit: { ...state.logToEdit, ...payload },
    };
  }
};

const completeUpdateLog = (state = initialState, payload) => {
  if (payload) {
    console.log("hello from reducer");
    return {
      ...state,
      editing: false,
      logToEdit: {},
      sleepLog: [
        ...state.sleepLog.map((log) => {
          if (log.sleep_record_id === payload.sleep_record_id) {
            return payload;
          } else {
            return log;
          }
        }),
      ],
    };
  }
};

const deleteLog = (state = initialState, payload) => {
  if (payload) {
    return {
      ...state,
      sleepLog: [
        ...state.sleepLog.filter((log) => {
          return log.sleep_record_id !== payload;
        }),
      ],
    };
  }
};

export default createReducer(initialState, {
  [FETCH_LOGS]: fetchLogs,
  [LOADING_LOGS]: loadingLogs,
  [ERR_LOG]: errorLoading,
  [UPDATE_LOG]: completeUpdateLog,
  [DELETE_LOG]: deleteLog,
  [POST_LOG]: createLog,
  [START_UPDATE]: startUpdate,
});
