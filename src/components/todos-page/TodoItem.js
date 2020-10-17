import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TodoItemWrap,
  TodoTitleWrap,
  DeleteTodo,
  SubItemsContainer,
  AddSubItemWrap,
  AddSubItemButton,
} from "./TodoItem.elements.js";
import SubItemLayout from "./SubItemLayout";
import TextDisplay from "../common/TextDisplay";

export class TodoItem extends Component {
  render() {
    const { todo, delTodo, addSubItem, getNewValue, error } = this.props;
    console.log("this todo", todo);
    return (
      <TodoItemWrap>
        <TodoTitleWrap>
          <div style={{ cursor: "pointer" }}>
            <TextDisplay
              text={todo.title}
              fontSize={"20px"}
              error={error}
              getNewValue={getNewValue}
              todoId={todo.id}
            />
          </div>
          <div>
            <DeleteTodo onClick={() => delTodo(todo)} />
          </div>
        </TodoTitleWrap>
        <SubItemsContainer>
          <AddSubItemWrap>
            <AddSubItemButton onClick={() => addSubItem(todo)}>
              Add sub-item
            </AddSubItemButton>
          </AddSubItemWrap>
          <>
            <SubItemLayout todo={todo} />
          </>
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
