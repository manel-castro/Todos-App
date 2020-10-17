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
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoError, setNewTodoError] = useState(""); //I'll use errors directly as placeholder until I have other solution.

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

  const handleAddTodoSubmit = async () => {
    //const validation = await isNewTodoValid(newTodoTitle);
    //if (!validation) return;
    try {
      addTodo();
    } catch (err) {
      console.log("addTodo failed", err);
    }
  };

  const handleMarkCompleted = async (todo) => {
    try {
      await markComplete(todo);
    } catch (err) {
      alert("Server error: Todo haven't been marked");
    }
  };

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

  const handleChangeTodo = async (todoId, title) => {
    modifyTodo(todoId, title);
  };

  return (
    <>
      <AddTodo onSubmit={handleAddTodoSubmit} />
      <div style={{ overflowY: "scroll", height: "84vh" }}>
        <TodoList
          todos={todos}
          delTodo={handleDeleteTodo}
          addSubItem={handleAddSubItem}
          getNewValue={handleChangeTodo}
          error={newTodoError}
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
