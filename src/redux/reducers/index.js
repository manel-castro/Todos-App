import { combineReducers } from "redux";
import user from "./userReducers";
import todos from "./todosReducers";
import colors from "./colorsReducers";

const rootReducer = combineReducers({
  user: user,
  todos: todos,
  colors: colors,
});

export default rootReducer;
