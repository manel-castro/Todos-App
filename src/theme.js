export const themeGen = (colors) => {
  return {
    pageBackground: colors.pageBackground,
    mouseSelection: colors.mouseSelection,
    inputBorder: colors.inputBorder,
    footerText: colors.footerText,
    bodyText: colors.bodyText,
    primaryElements: colors.primaryElements,
  };
};
//Potential for customization.
//Theme is setted from Redux.
//
// softgrey: "rgb(239, 240, 210)", //color stock
// midwhite: "rgb(225,230,230)", // color stock
