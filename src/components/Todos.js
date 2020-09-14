import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const Todos = ({ todos, markComplete, delTodo }) => {
  //For conditional rendering below.
  const completedTodos = todos.filter((todo) => {
    return todo.completed === true;
  });

  return (
    <div>
      {todos
        .filter((todo) => {
          return todo.completed === false;
        })
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            markComplete={markComplete}
            delTodo={delTodo}
          />
        ))}
      {completedTodos.length === 0 ? null : (
        <div style={completedStyle}>
          <p>Completed Todos</p>
          <div style={completedTodoStyle}>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                markComplete={markComplete}
                delTodo={delTodo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const completedStyle = {
  padding: "10px",
  margin: "10px",
  background: "#d9d9d9",
};

const completedTodoStyle = {
  textDecoration: "line-through",
};

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default Todos;
