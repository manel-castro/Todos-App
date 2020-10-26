import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  TodoItemWrap,
  TodoTitleWrap,
  DeleteTodo,
  SubItemsContainer,
} from "./TodoItem.elements.js";
import SubItemLayout from "./SubItemLayout";
import TextDisplay from "../common/TextDisplay";

export class TodoItem extends PureComponent {
  componentDidMount() {
    console.log("TODO ITEM RERENDERED");
  }
  render() {
    const { todo, delTodo, getNewValue, checkErrors } = this.props;
    let isNew = todo.isNew ? todo.isNew : false;
    return (
      <TodoItemWrap>
        <TodoTitleWrap>
          <div style={{ cursor: "pointer", width: "100%" }}>
            <TextDisplay
              text={todo.title}
              isNew={isNew}
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
  getNewValue: PropTypes.func.isRequired,
  checkErrors: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownState) {
  const id = ownState.id;
  const stateTodos = state.todos;
  return {
    todo: stateTodos.filter((todo) => id.includes(todo.id))[0],
  };
}

export default connect(mapStateToProps)(TodoItem);
