export function dragTodo(draggerId, containerId) {
  var pos1, pos2, newPos;
  const draggerRef = document.getElementById(draggerId);
  const containerRef = document.getElementById(containerId);
  console.log("dragger", draggerRef);
  console.log("containerRef", containerRef);
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

    console.log(containerRef.offsetTop);
    containerRef.style.top = containerRef.offsetTop - pos2 + "px";
  }

  function dragOnMouseUp() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

export function dragElement(elmnt, draggerId) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(draggerId)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(draggerId).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
