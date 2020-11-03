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

//Development
import ErrorBoundary from "../../errorhandling/ErrorBoundary";

export const TodoItem = ({
  todo,
  delTodo,
  checkErrors,
  markNewTodoCount,
  moveTodoOrder,
  modifyTodo,
}) => {
  useEffect(() => {
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
                <ErrorBoundary>
                  <TextDisplay
                    text={todo.title}
                    modifyingElement={"TodoItem"}
                    isNew={todo.isNew}
                    fontSize={"20px"}
                    reduxCall={modifyTodo}
                    todoId={todo.id}
                    checkErrors={checkErrors}
                  />
                </ErrorBoundary>
              </div>
              <div>
                <DeleteTodo onClick={() => delTodo(todo)} />
              </div>
            </TodoTitleWrap>
            <>Saved</>
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
  modifyTodo: todosActions.modifyTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
