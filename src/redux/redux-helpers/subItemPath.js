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

export const modifyAndReturnAllObj = (obj, path, changeToMake) => {
  let currentNode = path[0];
  let localPath = [...path];
  if (localPath.length > 0) {
    localPath = localPath.slice(1, localPath.length);
    const final = modifyAndReturnAllObj(
      obj[currentNode],
      localPath,
      changeToMake
    );
    if (localPath.length === 0) {
      obj[currentNode] = final;
      localPath[0] = "";
    }
    return obj;
  } else {
    return { ...changeToMake, ...obj };
  }
};
