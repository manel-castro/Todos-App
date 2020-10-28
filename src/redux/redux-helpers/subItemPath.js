// THIS DOCUMENT HAS OBJECT MANAGERS AND MODIFIERS.
//
//	- Normally is necessary to deep-clone the objects. The fastest package at this moment is: "rfdc"
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

export const modifyAndReturnAllObj = (obj, path, newItemId, newItemData) => {
  let currentNode = path[0];
  let localPath = [...path];
  if (localPath.length > 0) {
    localPath = localPath.slice(1, localPath.length);
    const final = modifyAndReturnAllObj(
      obj[currentNode],
      localPath,
      newItemId,
      newItemData
    );
    if (localPath.length === 0) {
      obj[currentNode] = final;
      localPath[0] = "";
    }
    return obj;
  } else {
    if (obj[newItemId] === undefined) {
      return { ...obj, [newItemId]: { ...newItemData } };
    } else {
      return { ...obj[newItemId], ...newItemData };
    }
  }
};
