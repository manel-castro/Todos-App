import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TodoItemWrap,
  TodoTitleWrap,
  DeleteTodo,
  SubItemsContainer,
} from "./TodoItem.elements.js";
import SubItemLayout from "./SubItemLayout";
import TextDisplay from "../common/TextDisplay";

export class TodoItem extends Component {
  render() {
    const { todo, delTodo, getNewValue, checkErrors } = this.props;
    console.log("this todo", todo);
    return (
      <TodoItemWrap>
        <TodoTitleWrap>
          <div style={{ cursor: "pointer" }}>
            <TextDisplay
              text={todo.title}
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
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoItem;
