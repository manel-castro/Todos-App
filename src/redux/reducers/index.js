import { combineReducers } from "redux";
import user from "./userReducers";
import todos from "./todosReducers";

const rootReducer = combineReducers({
  user: user,
  todos: todos,
});

export default rootReducer;
