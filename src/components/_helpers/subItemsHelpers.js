const getFirstLevel = (nestedObj) => {
  const firstLevel = Object.keys(nestedObj).map((key) => {
    return key;
  });

  return firstLevel;
};

export const hasChildren = (nestedObj) => {
  const ObjectiveObj = getFirstLevel(nestedObj);

  const childrens = {};
  let exist = false;

  ObjectiveObj.map((key) => {
    let a = nestedObj[key];
    let count = 0;

    if (key === "title" || key === "timestamp") return;

    Object.keys(a).map((k) => {
      if (typeof a[k] === "object") {
        count++;
      }
    });

    if (count !== 0) exist = true;

    childrens[key] = {
      title: a.title,
      timestamp: a.timestamp,
      hasChildren: exist,
    };
    exist = false;
  });
  return childrens;
};
