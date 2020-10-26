export const themeGen = (colors) => {
  console.log("colors", colors);
  return {
    softwhite: "rgb(239, 240, 240)",
    softgrey: "rgb(239, 240, 210)",
    midwhite: "rgb(225,230,230)",
    lightgrey: "rgb(200,200,200)",
    midgrey: "rgb(150,150,150)",
    hardgrey: "rgb(70, 70, 70)",
    darkgrey: colors.darkgrey,
  };
};
//Potential for customization.
//Theme is setted from Redux.
