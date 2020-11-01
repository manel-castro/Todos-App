import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as todosExtraActions from "../../redux/actions/todosExtraActions";
import * as todosActions from "../../redux/actions/todosActions";
import PropTypes from "prop-types";
import {
  TodoItemPlace,
  TodoItemContainer,
  DraggableContainer,
  Separator,
  DragPlaceholder,
  DraggableIcon,
  TodoItemWrap,
  TodoTitleWrap,
  DeleteTodo,
  SubItemsContainer,
  IconsWrap,
  // UpIcon,
  // DownIcon,
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
}) => {
  useEffect(() => {
    if (todo.isNew) {
      markNewTodoCount(todo.id);
      //isNew = todo.isNew;
    }
    console.log("TODO ITEM MOUNTED");
    return () => console.log("TODO ITEM UNMOUNTING");
  }, []);

  const onClick = (direction) => {
    //up or down
    var x = document.getElementsByClassName("TodoItemNodeDiv");
    let thisTodoDivIndex;
    let todoToSwitchId, activeTodoId;
    console.log(x);

    let a = direction === "up" ? -1 : +1;

    for (let i = 0; i < x.length - 1; i++) {
      if (x[i].attributes.id.nodeValue === todo.id) thisTodoDivIndex = i;
    }
    // x[thisTodoDivIndex + a].parentNode.insertBefore(
    //   x[thisTodoDivIndex],
    //   x[thisTodoDivIndex + a]
    // );
    activeTodoId = x[thisTodoDivIndex].attributes.id.nodeValue;
    todoToSwitchId = x[thisTodoDivIndex + a].attributes.id.nodeValue;
    moveTodoOrder(activeTodoId, todoToSwitchId, direction);
  };

  return (
    <div id={todo.id} className={"TodoItemNodeDiv"}>
      <DragPlaceholder id={todo.id + "dragPlaceholder"} />

      <TodoItemPlace id={todo.id + "containerRef"}>
        <TodoItemContainer id={todo.id + "itemContainerRef"}>
          <DraggableContainer
            id={todo.id + "draggerRef"}
            onMouseDown={() => {}}
            onMouseUp={() => {}}
          >
            <IconsWrap id={todo.id + "iconsWrap"}>
              <DraggableIcon />
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
    </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
