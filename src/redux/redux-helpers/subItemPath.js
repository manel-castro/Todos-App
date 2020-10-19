export const subItemPath = (subItemId, todo) => {
  const { subItems } = todo;
  const path = [];
  let found = false;

  const mapping = (object) => {
    Object.keys(object).map((item) => {
      if (item === subItemId) {
        found = true;
      }
      if (
        found ||
        typeof object[item] === "string" ||
        typeof object[item] === "number"
      )
        return;
      path.push(item);
      if (typeof object[item] === "object") {
        mapping(object[item]);
        if (found) return;
        path.pop();
      }
    });
  };

  mapping(subItems);
  path.push(subItemId);
  return path;
};
