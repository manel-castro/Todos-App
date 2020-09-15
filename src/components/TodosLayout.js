import React from "react";
import PropTypes from "prop-types";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

const TodosLayout = ({ addTodo, todos, markComplete, delTodo }) => {
  return (
    <>
      <AddTodo addTodo={addTodo} />
      <div style={{ overflowY: "scroll", height: "84vh" }}>
        <Todos todos={todos} markComplete={markComplete} delTodo={delTodo} />
      </div>
    </>
  );
};

//PropTypes (Good Practice)
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default TodosLayout;
