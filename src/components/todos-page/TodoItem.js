import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as todosExtraActions from "../../redux/actions/todosExtraActions";
import * as todosActions from "../../redux/actions/todosActions";
import * as interactivityActions from "../../redux/actions/interactivityActions";
import PropTypes from "prop-types";
import {
  TodoItemPlace,
  TodoItemContainer,
  DraggableContainer,
  Separator,
  DragPlaceholder,
  //DraggableIcon,
  TodoItemWrap,
  TodoTitleWrap,
  DeleteTodo,
  SubItemsContainer,
  IconsWrap,
  UpIcon,
  DownIcon,
} from "./TodoItem.elements.js";
import SubItemLayout from "./SubItemLayout";
import TextDisplay from "../common/TextDisplay";

export const TodoItem = ({
  todo,
  delTodo,
  getNewValue,
  checkErrors,
  markNewTodoCount,
  moveTodoOrder,
  setItemPosition,
  itemPositions,
}) => {
  useEffect(() => {
    if (todo.isNew) {
      markNewTodoCount(todo.id);
      //isNew = todo.isNew;
    }

    // Drag-drop funcitonality
    const containerId = todo.id + "containerRef";
    const containerRef = document.getElementById(containerId);
    setItemPosition(todo.id, containerRef.offsetTop, containerRef.offsetHeight);
    console.log("MOUNTED");
    return () => console.log("rerendered");
  }, []);

  // let absoluteTop;
  // const calculateDrag = () => {
  //   console.log("SOMETHIN ELSE");
  //   const element = document.getElementById(todo.id + "containerRef");
  //   absoluteTop = element.offsetTop;
  //   console.log("ABSOLUTE TOP: ", absoluteTop);
  //   //		document.getElementById(this.containerId)
  // };

  return (
    <>
      <DragPlaceholder id={todo.id + "dragPlaceholder"} />

      <TodoItemPlace id={todo.id + "containerRef"}>
        <TodoItemContainer id={todo.id + "itemContainerRef"}>
          <DraggableContainer
            id={todo.id + "draggerRef"}
            onMouseDown={() => {}}
            onMouseUp={() => {}}
          >
            <IconsWrap>
              <UpIcon onClick={() => moveTodoOrder(todo.id, "up")} />
              <DownIcon onClick={() => moveTodoOrder(todo.id, "down")} />
            </IconsWrap>
            <Separator id={"TodoItemObserver"} />
          </DraggableContainer>
          <TodoItemWrap>
            <TodoTitleWrap>
              <div style={{ cursor: "pointer", width: "100%" }}>
                <TextDisplay
                  text={todo.title}
                  isNew={todo.isNew}
                  fontSize={"20px"}
                  getNewValue={getNewValue}
                  todoId={todo.id}
                  checkErrors={checkErrors}
                />
              </div>
              <div>
                <DeleteTodo onClick={() => delTodo(todo)} />
              </div>
            </TodoTitleWrap>
            <SubItemsContainer>
              <SubItemLayout todo={todo} />
            </SubItemsContainer>
          </TodoItemWrap>
        </TodoItemContainer>
      </TodoItemPlace>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  delTodo: PropTypes.func.isRequired,
  getNewValue: PropTypes.func.isRequired,
  checkErrors: PropTypes.func.isRequired,
  markNewTodoCount: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownState) {
  const id = ownState.id;
  const stateTodos = state.todos;
  return {
    todo: stateTodos.filter((todo) => id.includes(todo.id))[0],
    //Change this to increase efficiency...
  };
}

const mapDispatchToProps = {
  markNewTodoCount: todosExtraActions.markNewTodoCount,
  moveTodoOrder: todosActions.moveTodoOrder,
  setItemPosition: interactivityActions.setItemPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
