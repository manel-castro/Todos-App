import React, { Component } from "react";
import PropTypes from "prop-types";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export class TodoItem extends Component {
  //Style into the component but separated from the div
  // to use the ternary operator and simplify things

  render() {
    //destructuring: to pull of the variables from props and use just the single variable
    const { todo, markComplete, delTodo } = this.props;

    return (
      <div style={todoStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => markComplete(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.title}
          </div>
          <div>
            <DeleteForeverIcon
              onClick={() => delTodo(todo.id)}
              style={btnStyle}
            >
              X
            </DeleteForeverIcon>
          </div>
        </div>
      </div>
    );
  }
}

const todoStyle = {
  background: "#f4f4f4",
  padding: "10px",
  borderBottom: "1px #ccc dotted",
};

const btnStyle = {
  color: "red",
  cursor: "pointer",
  float: "right",
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoItem;
