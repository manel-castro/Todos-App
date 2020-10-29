import * as types from "../actions/actionTypes"; //eslint-disable-line
import initialState from "./initialState";

export default function todosReducer(state = initialState.colors, action) {
  switch (action.type) {
    case types.SET_COLOR_PALETTE_SUCCESS:
      console.log("NEWS COLOR TO SET", action.colorPalette);
      console.log("color redux", { ...state, ...action.colorPalette });
      return { ...state, ...action.colorPalette };
    default:
      console.log("from reducers", state);
      return state;
  }
}
