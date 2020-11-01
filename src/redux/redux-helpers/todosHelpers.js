export const reorderTodos = (todos, activeTodoId, todoToSwitchId) => {
  let todoIndex, activeTodo, todoToSwitch, switchedItem1, switchedItem2;

  todos.forEach((item, uid) => {
    if (item.id === activeTodoId) {
      todoIndex = uid;
      activeTodo = item;
    }
  });

  if (todoIndex === 0) throw "Beyond array scope"; //beyondArray = true;

  const returnArray = todos.map((item, uid) => {
    if (item.id === todoToSwitchId) {
      todoToSwitch = item;
      switchedItem1 = { ...activeTodo, orderCount: todoToSwitch.orderCount };
      return switchedItem1;
    }
    if (item.id === activeTodo.id) {
      switchedItem2 = {
        ...todoToSwitch,
        orderCount: activeTodo.orderCount,
      };
      return switchedItem2;
    }
    return item;
  });
  return [returnArray, switchedItem1, switchedItem2];
};
