import React from "react";
import PropTypes from "prop-types";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

class TodosLayout extends React.Component {
  render() {
    //   console.log(this.props.todos)
    return (
      <>
        <AddTodo AddTodo={this.props.AddTodo} />
        <div style={{ overflowY: "scroll", height: "84vh" }}>
          <Todos
            todos={this.props.todos}
            markComplete={this.props.markComplete}
            delTodo={this.props.delTodo}
          />
        </div>
      </>
    );
  }
}

//PropTypes (Good Practice)
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodosLayout;
