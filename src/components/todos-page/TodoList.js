import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { TodosListContainer, TodosListWrap } from "./TodoList.elements";

const TodoList = ({ todos, delTodo, addSubItem, getNewValue, error }) => {
  //For conditional rendering below.
  //useful to order items by label, or search items?
  //const completedTodos = todos.filter((todo) => {
  //  return todo.completed === true;
  //});

  return (
    <TodosListContainer>
      <TodosListWrap>
        {todos
          //.filter((todo) => {
          //return todo.completed === false;
          //})
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              delTodo={delTodo}
              addSubItem={addSubItem}
              getNewValue={getNewValue}
              error={error}
            />
          ))}
      </TodosListWrap>
    </TodosListContainer>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  addSubItem: PropTypes.func.isRequired,
};

export default TodoList;
