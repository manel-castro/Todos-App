import { throttle } from "../../components/_helpers/genericUtils";
export function dragTodo(moveTodoOrder) {
  var pos1, pos2, pos3, pos4;

  const todoItemNodes = document.getElementsByClassName("TodoItemNodeDiv");
  const todoIds = [];
  for (let i = 0; i < todoItemNodes.length - 1; i++) {
    todoIds.push(todoItemNodes[i].attributes.id.nodeValue);
  }
  todoIds.forEach((item) => {
    let draggerRef = document.getElementById(item + "draggerRef");
    draggerRef.addEventListener("mousedown", function (e) {
      onMouseDown(e, item, todoItemNodes, draggerRef);
    });
  });

  const onMouseDown = (e, todoId, todoItemNodes, draggerRef) => {
    e = e || window.event; // for older IE
    e.preventDefault();
    console.log("DRAGGER CLICKED", todoId);
    let containerRef = document.getElementById(todoId + "containerRef");
    let dragPlaceholderRef = document.getElementById(
      todoId + "dragPlaceholder"
    );

    // CHANGES ON STYLE ON MOUSE DOWN
    // set the placeholder space when dragging.
    const initialHeight = containerRef.scrollHeight;
    dragPlaceholderRef.style.cssText = `display:block;height:${initialHeight}px;`;

    //set the position when dragging item.
    const offsetTop = containerRef.offsetTop;
    const initialWidth = containerRef.offsetWidth;
    console.log("initialWidth");

    containerRef.style.cssText = `position:absolute;top:${
      offsetTop - initialHeight
    }px;z-index:11;width:${initialWidth}px`;

    let itemsToWatch = [];
    for (let i = 0; i < todoItemNodes.length - 1; i++) {
      if (todoItemNodes[i].attributes.id.nodeValue === todoId) continue;
      itemsToWatch.push(todoItemNodes[i]);
    }
    console.log(itemsToWatch);

    // SETTING UP BEHAVIOR ON MOVE MOUSE.

    function setReorderLimit(todosInteractivity, todoId) {
      let itemIndex;
      todosInteractivity.forEach((item, uid) => {
        if (item.id === todoId) {
          itemIndex = uid;
          console.log("INDEX: ", itemIndex);
        }
      });
      let upperLimit, lowerLimit;
      if (itemIndex === 0) {
        lowerLimit = todosInteractivity[itemIndex + 1].position;
        console.log("IS FIRST ITEM: ", lowerLimit);
        return [false, lowerLimit];
      } //cannot go up, so we'll dont have up index
      if (itemIndex === todosInteractivity.length - 1) {
        upperLimit =
          todosInteractivity[itemIndex - 1].position +
          todosInteractivity[itemIndex - 1].height;
        console.log("IS LAST ITEM: ", upperLimit);
        return [upperLimit, false];
      } //canot go down, so well don't have down index
      upperLimit =
        todosInteractivity[itemIndex - 1].position +
        todosInteractivity[itemIndex - 1].height;
      lowerLimit = todosInteractivity[itemIndex + 1].position;
      return [upperLimit, lowerLimit];
    }
    //    const reorderLimits = setReorderLimit(todosInteractivity, todoId); //returns (upperLimit, lowerLimit)
    //  console.log(".....------", reorderLimits);

    pos1 = e.clientY; //just going to be vertical movement
    pos3 = e.clientX;
    document.onmousemove = function (e) {
      dragOnMouseMove(
        e,
        //  reorderLimits[0],
        //reorderLimits[1],
        todoId,
        containerRef,
        draggerRef,
        dragPlaceholderRef,
        todoItemNodes
      );
    };
    document.onmouseup = function (e) {
      dragOnMouseUp(e, containerRef, dragPlaceholderRef);
    };
  };
  //
  //
  //    // SETTING UP BEHAVIOR ON MOVE MOUSE.
  //    const itemPositions = getTodosInteractivity();
  //
  //    function setReorderLimit(itemPositions, todoId) {
  //      let itemIndex;
  //      itemPositions.forEach((item, uid) => {
  //        if (item.id === todoId) {
  //          itemIndex = uid;
  //          console.log("INDEX: ", itemIndex);
  //        }
  //      });
  //      let upperLimit, lowerLimit;
  //      if (itemIndex === 0) {
  //        lowerLimit = itemPositions[itemIndex + 1].position;
  //        console.log("IS FIRST ITEM: ", lowerLimit);
  //        return [false, lowerLimit];
  //      } //cannot go up, so we'll dont have up index
  //      if (itemIndex === itemPositions.length - 1) {
  //        upperLimit =
  //          itemPositions[itemIndex - 1].position +
  //          itemPositions[itemIndex - 1].height;
  //        console.log("IS LAST ITEM: ", upperLimit);
  //        return [upperLimit, false];
  //      } //canot go down, so well don't have down index
  //      upperLimit =
  //        itemPositions[itemIndex - 1].position +
  //        itemPositions[itemIndex - 1].height;
  //      lowerLimit = itemPositions[itemIndex + 1].position;
  //      return [upperLimit, lowerLimit];
  //    }
  //    const reorderLimits = setReorderLimit(itemPositions, todoId); //returns (upperLimit, lowerLimit)
  //    console.log(".....------", reorderLimits);
  //
  //    pos1 = e.clientY; //just going to be vertical movement
  //    document.onmousemove = function (e) {
  //      dragOnMouseMove(e, reorderLimits[0], reorderLimits[1]);
  //    };
  //    document.onmouseup = dragOnMouseUp;
  //  }
  //
  function dragOnMouseMove(
    e,
    todoId,
    containerRef,
    draggerRef,
    dragPlaceholderRef
  ) {
    e = e || window.event;
    e.preventDefault();

    pos2 = pos1 - e.clientY;
    pos1 = e.clientY;
    pos4 = pos3 - e.clientX;
    pos3 = e.clientX;

    //set change order
    // if (upperLimit) {
    //   if (pos1 < upperLimit) {
    //     moveTodoOrder(todoId, "up");
    //   }
    // }

    const outOfDragger = () => {
      let draggerBounding = draggerRef.getBoundingClientRect();
      if (pos3 < draggerBounding.left || pos3 > draggerBounding.right) {
        dragOnMouseUp(e, containerRef, dragPlaceholderRef);
      }
    };

    const detectChange = () => {
      console.log(" ");
    };

    throttle(400, () => {
      outOfDragger();
      detectChange();
    });

    //Drop the element if out of dragger width.

    containerRef.style.top = containerRef.offsetTop - pos2 + "px";
  }

  function dragOnMouseUp(e, containerRef, dragPlaceholderRef) {
    containerRef.style.cssText = `position:static;z-index:10;width:auto;`;
    dragPlaceholderRef.style.cssText = `display:none;height:0px;`;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
