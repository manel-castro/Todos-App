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

    //CHANGE TO MAKEif (key === "title" || key === "timestamp" || key === "orderCount") return;
    if (typeof nestedObj[key] !== "object") return;

    Object.keys(a).map((k) => {
      if (typeof a[k] === "object") {
        count++;
      }
    });

    if (count !== 0) exist = true;

    childrens[key] = {
      title: a.title,
      timestamp: a.timestamp,
      orderCount: a.orderCount,
      hasChildren: exist,
    };
    exist = false;
  });
  return childrens;
};
