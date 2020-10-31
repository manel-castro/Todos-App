import { throttle } from "../../components/_helpers/genericUtils";
export function dragTodo(todoId, getTodosInteractivity, moveTodoOrder) {
  var pos1, pos2;

  const draggerId = todoId + "draggerRef";
  const containerId = todoId + "containerRef";
  const itemContainerId = todoId + "itemContainerRef";
  const dragPlaceholderId = todoId + "dragPlaceholder";
  const draggerRef = document.getElementById(draggerId);
  const containerRef = document.getElementById(containerId);
  const itemContainerRef = document.getElementById(itemContainerId);
  const dragPlaceholderRef = document.getElementById(dragPlaceholderId);
  //const headerHeight = document.getElementById("headerHeight").offsetTop;
  //get all todo positions object:

  //get initial container position
  const initialOffsetTop = containerRef.offsetTop;
  //  console.log(initialOffsetTop, containerRef);
  //  console.log(containerRef.style);
  //  let array = [];
  //  function ConsoleLogger(ref) {
  //    console.log(ref, ref.offsetTop);
  //  }
  //  document.getElementById("todosLayout").onscroll = function () {
  //    throttle(500, ConsoleLogger, containerRef);
  //  };
  draggerRef.onmousedown = dragOnMouseDown;

  function dragOnMouseDown(e) {
    e = e || window.event; // for older IE
    e.preventDefault();
    //when going down, it has to surpass the position of the next item.
    // when going up, it has to surpass de position of the next item plus it's height (we need the height on redux too. )
    // then we fire the action change.

    // CHANGES ON STYLE ON MOUSE DOWN
    // set the placeholder space when dragging.
    const initialHeight = itemContainerRef.scrollHeight;
    dragPlaceholderRef.style.cssText = `display:block;height:${
      initialHeight + 20
    }px;`;

    //set the position when dragging item.
    const offsetTop = containerRef.offsetTop;
    const initialWidth = containerRef.offsetWidth;
    console.log("initialWidth");

    containerRef.style.cssText = `position:absolute;top:${
      offsetTop - initialHeight - 20
    }px;z-index:11;width:${initialWidth}px`;

    // SETTING UP BEHAVIOR ON MOVE MOUSE.
    const itemPositions = getTodosInteractivity();

    function setReorderLimit(itemPositions, todoId) {
      let itemIndex;
      itemPositions.forEach((item, uid) => {
        if (item.id === todoId) {
          itemIndex = uid;
          console.log("INDEX: ", itemIndex);
        }
      });
      let upperLimit, lowerLimit;
      if (itemIndex === 0) {
        lowerLimit = itemPositions[itemIndex + 1].position;
        console.log("IS FIRST ITEM: ", lowerLimit);
        return [false, lowerLimit];
      } //cannot go up, so we'll dont have up index
      if (itemIndex === itemPositions.length - 1) {
        upperLimit =
          itemPositions[itemIndex - 1].position +
          itemPositions[itemIndex - 1].height;
        console.log("IS LAST ITEM: ", upperLimit);
        return [upperLimit, false];
      } //canot go down, so well don't have down index
      upperLimit =
        itemPositions[itemIndex - 1].position +
        itemPositions[itemIndex - 1].height;
      lowerLimit = itemPositions[itemIndex + 1].position;
      return [upperLimit, lowerLimit];
    }
    const reorderLimits = setReorderLimit(itemPositions, todoId); //returns (upperLimit, lowerLimit)
    console.log(".....------", reorderLimits);

    pos1 = e.clientY; //just going to be vertical movement
    document.onmousemove = function (e) {
      dragOnMouseMove(e, reorderLimits[0], reorderLimits[1]);
    };
    document.onmouseup = dragOnMouseUp;
  }

  function dragOnMouseMove(e, upperLimit, lowerLimit) {
    e = e || window.event;
    e.preventDefault();

    pos2 = pos1 - e.clientY;
    pos1 = e.clientY;

    //set change order
    if (upperLimit) {
      if (pos1 < upperLimit) {
        moveTodoOrder(todoId, "up");
      }
    }

    //  console.log(containerRef.offsetTop);
    containerRef.style.top = containerRef.offsetTop - pos2 + "px";
  }

  function dragOnMouseUp() {
    containerRef.style.cssText = `position:static;z-index:10;width:auto;`;
    dragPlaceholderRef.style.cssText = `display:none;height:0px;`;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
