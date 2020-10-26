import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as todosActions from "../../redux/actions/todosActions";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
//eslint-disable-next-line
class TodosLayout extends Component<Props, never> {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
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
    console.log(isEqual(this.props.todoIds, nextProps.todoIds));
    return !isEqual(this.props.todoIds, nextProps.todoIds);
  }

  componentDidMount() {
    console.log("ComponentMounted TODOS LAYOUT");
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

  handleAddTodoSubmit = async () => {
    if (this.props.anyTodoExist) {
      console.log("testing");
    }
    try {
      this.props.addTodo();
    } catch (err) {
      console.log("addTodo failed", err);
    }
    this.containerRef.current.scrollTop = 0;
  };

  handleChangeTodo = async (todoId, title, isNew) => {
    this.props.modifyTodo(todoId, title, isNew);
  };

  //  handleMarkCompleted = async (todo) => {
  //   try {
  //     await markComplete(todo);
  //   } catch (err) {
  //     alert("Server error: Todo haven't been marked");
  //   }
  // };

  handleDeleteTodo = async (todo) => {
    if (window.confirm("Are you sure to delete this note?")) {
      try {
        await this.props.delTodo(todo);
      } catch (err) {
        alert("Server error: Todo haven't been deleted");
      }
    }
  };

  handleAddSubItem = async (todo) => {
    try {
      await this.props.addSubItem(todo);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { todoIds, todosExist } = this.props;

    return (
      <>
        <AddTodo onSubmit={this.handleAddTodoSubmit} todosExist={todosExist} />
        <div
          ref={this.containerRef}
          style={{
            overflowY: "scroll",
            marginBottom: "5px",
            paddingBottom: "70px",
          }}
        >
          <TodoList
            todoIds={todoIds}
            delTodo={this.handleDeleteTodo}
            addSubItem={this.handleAddSubItem}
            getNewValue={this.handleChangeTodo}
            checkErrors={this.isNewTodoValid}
          />
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
};

export function mapStateToProps(state) {
  let anyTodoIsNew = 0;
  let todoIds = state.todos.map((todo) => {
    if (todo.isNew) anyTodoIsNew++;
    return todo.id;
  });
  return {
    todoIds: todoIds,
    todosExist: todoIds.length !== 0,
    anyTodoNew: anyTodoIsNew > 0 ? true : false,
  };
}

export const mapDispatchToProps = {
  addTodo: todosActions.addTodo,
  delTodo: todosActions.deleteTodo,
  addSubItem: todosActions.addSubItem,
  modifyTodo: todosActions.modifyTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosLayout);
