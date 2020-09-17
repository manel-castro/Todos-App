import { combineReducers } from "redux";
import user from "./userReducers";

const rootReducer = combineReducers({
  user: user,
});

export default rootReducer;
