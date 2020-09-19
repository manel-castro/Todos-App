import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as todosActions from "../../redux/actions/todosActions";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const TodosLayout = ({ addTodo, todos, markComplete, delTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  //I'll use errors directly as placeholder until I have other solution.
  const [newTodoError, setNewTodoError] = useState("Add todo...");

  const handleAddTodoChange = (e) => {
    setNewTodoTitle(e.target.value);
  };

  const isNewTodoValid = (title) => {
    const regEx = /^[A-Za-z]/;
    if (title === "" || !regEx.test(title)) {
      setNewTodoError("We need some letters");
      setNewTodoTitle("");
      return false;
    }
    if (title.length > 100) {
      setNewTodoError("Title too long");
      setNewTodoTitle("");
      return false;
    }
    return true;
  };

  const handleAddTodoSubmit = async (e) => {
    e.preventDefault();
    const validation = await isNewTodoValid(newTodoTitle);
    if (!validation) return;
    console.log("add");
    addTodo({ title: newTodoTitle });
    setNewTodoTitle("");
    setNewTodoError("Add todo...");
  };

  const handleMarkCompleted = async (todo) => {
    try {
      await markComplete(todo);
    } catch (err) {
      alert("Server error: Todo haven't been marked");
    }
  };

  return (
    <>
      <AddTodo
        onChange={handleAddTodoChange}
        onSubmit={handleAddTodoSubmit}
        title={newTodoTitle}
        errors={newTodoError}
        placeholder={newTodoError}
      />
      <div style={{ overflowY: "scroll", height: "84vh" }}>
        <TodoList
          todos={todos}
          markComplete={handleMarkCompleted}
          delTodo={delTodo}
        />
      </div>
    </>
  );
};

//PropTypes (Good Practice)
TodosLayout.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos,
  };
}

export const mapDispatchToProps = {
  addTodo: todosActions.addTodo,
  markComplete: todosActions.markTodoCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosLayout);
