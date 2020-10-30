export const reorderTodos = (array, todoToReorder) => {
  //Reorders items by switching them using the array index and switching their orderCount.
  //Returns array with reordered todos and the todos that have been switched.

  let todoIndex, itemWhoEchangesPosition, switchedItem1, switchedItem2;

  array.forEach((item, uid) => {
    if (item.id === todoToReorder.id) todoIndex = uid;
  });

  if (todoIndex === 0) throw "Beyond array scope"; //beyondArray = true;

  const returnArray = array.map((item, uid) => {
    if (uid === todoIndex - 1) {
      itemWhoEchangesPosition = { ...item };
      switchedItem1 = { ...todoToReorder, orderCount: item.orderCount };
      return switchedItem1;
    }
    if (uid === todoIndex) {
      switchedItem2 = {
        ...itemWhoEchangesPosition,
        orderCount: todoToReorder.orderCount,
      };
      return switchedItem2;
    }
    return item;
  });
  return [returnArray, switchedItem1, switchedItem2];
};
