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

export const addObjAndReturnAllObj = (obj, path, newObj) => {
  let currentNode = path[0];
  let localPath = [...path];
  if (localPath.length > 0) {
    localPath = localPath.slice(1, localPath.length);
    const final = addObjAndReturnAllObj(obj[currentNode], localPath, newObj);
    if (localPath.length === 0) {
      obj[currentNode] = final;
      localPath[0] = "";
    }
    return obj;
  } else {
    return { ...obj, ...newObj };
  }
};

export const modifyPropertyAndReturnAllObj = (
  obj,
  pathToObj, // must include object Id attempting to modify
  newItemData
) => {
  let localPath = [...pathToObj];
  let currentNode = localPath[0];
  if (localPath.length > 0) {
    localPath = localPath.slice(1, localPath.length);
    const final = modifyPropertyAndReturnAllObj(
      obj[currentNode],
      localPath,
      newItemData
    );
    if (localPath.length === 0) {
      obj[currentNode] = final;
      localPath[0] = "";
    }
    return obj;
  } else {
    return { ...obj, ...newItemData };
  }
};

export const deleteObjAndReturnAllObj = (
  obj,
  pathToObj, // must include object Id attempting to modify
  newItemId
) => {
  let localPath = [...pathToObj];
  let currentNode = localPath[0];
  if (localPath.length > 0) {
    localPath = localPath.slice(1, localPath.length);
    const final = deleteObjAndReturnAllObj(
      obj[currentNode],
      localPath,
      newItemId
    );
    if (localPath.length === 0) {
      console.log("OBJ CURRENT NODE ON DELETE: ", obj[currentNode]);
      obj[currentNode] = final;
      localPath[0] = "";
    }
    return obj;
  } else {
    console.log("return last subitem obj: ", obj);
    return { ...obj };
  }
};
