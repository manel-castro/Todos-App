import { throttle } from "./genericUtils";
export function dragTodo(todoId, getItemPositions, setPosition) {
  var pos1, pos2, newPos;

  const draggerId = todoId + "draggerRef";
  const containerId = todoId + "containerRef";
  const itemContainerId = todoId + "itemContainerRef";
  const dragPlaceholderId = todoId + "dragPlaceholder";
  const draggerRef = document.getElementById(draggerId);
  const containerRef = document.getElementById(containerId);
  const itemContainerRef = document.getElementById(itemContainerId);
  const dragPlaceholderRef = document.getElementById(dragPlaceholderId);

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
    const itemPositions = getItemPositions();
    let itemIndex;
    itemPositions.forEach((item, uid) => {
      if (item.id === todoId) {
        itemIndex = uid;
      }
    });

    if (itemIndex === 0) {
    } //cannot go up, so we'll dont have up index
    if (itemIndex === itemPositions.length - 1) {
    } //canot go down, so well don't have down index

    //when going down, it has to surpass the position of the next item.
    // when going up, it has to surpass de position of the next item plus it's height (we need the height on redux too. )
    // then we fire the action change.

    // set the placeholder space when dragging.
    const initialHeight = itemContainerRef.scrollHeight;
    dragPlaceholderRef.style.cssText = `display:block;height:${
      initialHeight + 20
    }px;`;

    //set the position when dragging item.
    const offsetTop = containerRef.offsetTop;
    const initialWidth = containerRef.offsetWidth;
    const separation = containerRef.style;
    console.log("initialWidth");

    containerRef.style.cssText = `position:absolute;top:${
      offsetTop - initialHeight - 20
    }px;z-index:99;width:${initialWidth}px`;

    pos1 = e.clientY; //just going to be vertical movement
    document.onmouseup = dragOnMouseUp;

    document.onmousemove = dragOnMouseMove;
  }

  function dragOnMouseMove(e) {
    e = e || window.event;
    e.preventDefault();

    pos2 = pos1 - e.clientY;
    pos1 = e.clientY;

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
