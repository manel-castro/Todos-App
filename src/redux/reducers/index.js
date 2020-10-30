import { combineReducers } from "redux";
import user from "./userReducers";
import todos from "./todosReducers";
import colors from "./colorsReducers";
import todosExtra from "./todosExtraReducers";
import calls from "./callsInProgressReducers";
import interactivity from "./interactivityReducers";

const rootReducer = combineReducers({
  user: user,
  todos: todos,
  todosExtra: todosExtra,
  colors: colors,
  callsInProgress: calls,
  interactivity: interactivity,
});

export default rootReducer;
