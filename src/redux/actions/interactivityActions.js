import * as types from "./actionTypes";

export const setItemPosition = (todoId, position) => {
  return { type: types.SET_ITEM_POSITION, todoId, position };
};

export const getItemPositions = () => (dispatch, getState) => {
  const { interactivity } = getState();
  const itemPositions = interactivity.positions;
  console.log(itemPositions);

  return itemPositions;
};
