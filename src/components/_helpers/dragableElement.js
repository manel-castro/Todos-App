import { throttle } from "./genericUtils";
export function dragTodo(todoId) {
  var pos1, pos2, newPos;

  const draggerId = todoId + "draggerRef";
  const containerId = todoId + "containerRef";
  const draggerRef = document.getElementById(draggerId);
  const containerRef = document.getElementById(containerId);

  //get initial container position
  const initialOffsetTop = containerRef.offsetTop;
  console.log(initialOffsetTop, containerRef);
  console.log(containerRef.style);
  let array = [];
  function ConsoleLogger(ref) {
    console.log(ref, ref.offsetTop);
  }
  document.getElementById("todosLayout").onscroll = function () {
    throttle(500, ConsoleLogger, containerRef);
  };
  draggerRef.onmousedown = dragOnMouseDown;

  function dragOnMouseDown(e) {
    e = e || window.event; // for older IE
    e.preventDefault();

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
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
