import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sleepLogReducer from "./sleepLogReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  sleepLog: sleepLogReducer,
});

export default rootReducer;
