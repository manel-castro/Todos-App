import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function callsInProgress(
  state = initialState.callsInProgress,
  action
) {
  switch (action.type) {
    case types.START_ACTION_CALL:
      console.log("FROM REDUX API");
      console.log(action.element.addTodo);
      return { ...state, ...action.element };

    case types.END_ACTION_CALL:
      //let newObj = {};
      console.log("ON END ACTION CALL");
      Object.keys(state).forEach((element) => {
        console.log(element);
				element === action.element ? { [action.element]: false } : element
      });
      return state;

    default:
      return state;
  }
}
