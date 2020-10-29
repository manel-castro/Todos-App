import * as types from "./actionTypes";

export function setColorPaletteSuccess(colorPalette) {
  return { type: types.SET_COLOR_PALETTE_SUCCESS, colorPalette };
}

//Thunks... change on user.
const paletteOfColors = [
  {
    name: "blueMate",
    primaryElements: "#305082",
    pageBackground: "#C7C8FE",
    mouseSelection: "C7C8FE",
    inputBorder: "rgb(150,150,150)",
    footerText: "rgb(150,150,150)",
    bodyText: "rgb(50, 50, 50)",
  },
];

export const setColorPalette = (selectedPalette) => (dispatch, getState) => {
  // get state to get user uid

  const colorPalette = paletteOfColors.filter(
    (color) => color.name === selectedPalette
  );
  console.log("SELECTED PALETTE", colorPalette);
  dispatch(setColorPaletteSuccess(colorPalette[0]));
};
