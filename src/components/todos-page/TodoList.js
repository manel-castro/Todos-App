import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { TodosListContainer, TodosListWrap } from "./TodoList.elements";

const TodoList = ({
  todoIds = [],
  delTodo,
  addSubItem,
  getNewValue,
  checkErrors,
}) => {
  //For conditional rendering below.
  //useful to order items by label, or search items?
  //const completedTodos = todos.filter((todo) => {
  //  return todo.completed === true;
  //});
  return (
    <TodosListContainer>
      <TodosListWrap>
        {todoIds.length === 0
          ? null
          : todoIds
            //.filter((todo) => {
            //return todo.completed === false;
            //})
            .map((id) => (
              <TodoItem
                key={id}
                id={id}
                delTodo={delTodo}
                addSubItem={addSubItem}
                getNewValue={getNewValue}
                checkErrors={checkErrors}
              />
            ))}
      </TodosListWrap>
    </TodosListContainer>
  );
};

TodoList.propTypes = {
  todoIds: PropTypes.array.isRequired,
  delTodo: PropTypes.func.isRequired,
  addSubItem: PropTypes.func.isRequired,
  getNewValue: PropTypes.func.isRequired,
  checkErrors: PropTypes.func.isRequired,
};

export default TodoList;
