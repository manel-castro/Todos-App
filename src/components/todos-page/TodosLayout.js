import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as todosActions from "../../redux/actions/todosActions";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const TodosLayout = ({
  addTodo,
  todos,
  markComplete,
  delTodo,
  addSubItem,
  modifyTodo,
}) => {
  const isNewTodoValid = (title) => {
    const regEx = /^[A-Za-z]/;
    let error;
    if (title === "" || !regEx.test(title)) {
      return "We need some letters";
    }
    if (title.length > 100) {
      return "Text too long";
    }
    return "";
  };

  const handleAddTodoSubmit = async () => {
    try {
      addTodo();
    } catch (err) {
      console.log("addTodo failed", err);
    }
  };

  const handleChangeTodo = async (todoId, title) => {
    modifyTodo(todoId, title);
  };

  // const handleMarkCompleted = async (todo) => {
  //   try {
  //     await markComplete(todo);
  //   } catch (err) {
  //     alert("Server error: Todo haven't been marked");
  //   }
  // };

  const handleDeleteTodo = async (todo) => {
    if (window.confirm("Are you sure to delete this note?")) {
      try {
        await delTodo(todo);
      } catch (err) {
        alert("Server error: Todo haven't been deleted");
      }
    }
  };

  const handleAddSubItem = async (todo) => {
    try {
      await addSubItem(todo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AddTodo onSubmit={handleAddTodoSubmit} />
      <div style={{ overflowY: "auto", height: "84vh" }}>
        <TodoList
          todos={todos}
          delTodo={handleDeleteTodo}
          addSubItem={handleAddSubItem}
          getNewValue={handleChangeTodo}
          checkErrors={isNewTodoValid}
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
  delTodo: todosActions.deleteTodo,
  addSubItem: todosActions.addSubItem,
  modifyTodo: todosActions.modifyTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosLayout);
