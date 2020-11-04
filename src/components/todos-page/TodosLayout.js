import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as todosActions from "../../redux/actions/todosActions";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

//Development
import ErrorBoundary from "../../errorhandling/ErrorBoundary";

//eslint-disable-next-line
class TodosLayout extends Component<Props, never> {
  constructor(props) {
    super(props);
  }
  //eslint-disable-next-line
  shouldComponentUpdate(nextProps: props) {
    function isEqual(arr1, arr2) {
      let equal = true;
      //      console.log("ARR1 length", arr1.length);
      //      console.log("ARR2 length", arr2.length);
      if (arr1.length !== arr2.length) {
        return false;
      }
      arr2.forEach((key, index) => {
        if (arr2[index] !== arr1[index]) {
          equal = false;
          return equal;
        }
      });
      return equal;
    }
    return !isEqual(this.props.todoIds, nextProps.todoIds);
  }
  componentDidMount() {
    console.log("TODOS LAYOUT RENDERED");
  }
  componentDidUpdate() {
    console.log("TODOS LAYOUT RERENDERED");
  }

  isNewTodoValid = (title) => {
    const regEx = /^[A-Za-z]/;
    if (title === "" || !regEx.test(title)) {
      return "We need some letters";
    }
    if (title.length > 100) {
      return "Text too long";
    }
    return "";
  };

  //  handleMarkCompleted = async (todo) => {
  //   try {
  //     await markComplete(todo);
  //   } catch (err) {
  //     alert("Server error: Todo haven't been marked");
  //   }
  // };


  handleModifyTodo = (todoId, text, isNew, modifyingElement) => {
    try {
      this.props.modifyTodo(todoId, text, isNew, modifyingElement);
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteTodo = async (todo) => {
    if (window.confirm("Are you sure to delete this note?")) {
      try {
        await this.props.delTodo(todo);
      } catch (err) {
        alert("Server error: Todo haven't been deleted");
      }
    }
  };


  render() {
    const { todoIds } = this.props;

    return (
      <>
        <ErrorBoundary>
          <AddTodo />
        </ErrorBoundary>
        <div
          id={"todosLayoutId"}
          style={{
            overflowY: "auto",
            marginBottom: "5px",
            paddingBottom: "70px",
          }}
        >
          <ErrorBoundary>
            <TodoList
              todoIds={todoIds}
              delTodo={this.handleDeleteTodo}
              handleModifyTodo={this.handleModifyTodo}
              checkErrors={this.isNewTodoValid}
            />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

//PropTypes (Good Practice)
TodosLayout.propTypes = {
  todoIds: PropTypes.array.isRequired,
  delTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  anyTodoNew: PropTypes.string.isRequired,
};

export function mapStateToProps(state) {
  let todoIds = state.todos.map((todo) => todo.id);
  return {
    todoIds: todoIds,
  };
}

export const mapDispatchToProps = {
  delTodo: todosActions.deleteTodo,
  modifyTodo: todosActions.modifyTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosLayout);
