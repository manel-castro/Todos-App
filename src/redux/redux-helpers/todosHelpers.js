export const reorderTodos = (array, todoToReorderId) => {
  //Reorders items by switching them using the array index and switching their orderCount.
  //Returns array with reordered todos and the todos that have been switched.

  let todoToReorder,
    todoIndex,
    itemWhoEchangesPosition,
    switchedItem1,
    switchedItem2;

  array.forEach((item, uid) => {
    if (item.id === todoToReorderId) {
      todoIndex = uid;
      todoToReorder = item;
    }
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
