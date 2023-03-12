import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as todosActions from "../redux/actions/todosActions";
import { dragTodo } from "./draggableElement/draggableElement";

const CustomStyles = ({ getReduxTodos, moveTodoOrder }) => {
  //if this useEffect doesn't work, we'll need a redux action to indicate when todos are totally loaded.
  async function something() {
    var intr = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(intr);
        console.log("CSS LOADED", document.getElementById("TodoItemObserver"));
        //        dragTodo(moveTodoOrder);
      }
    }, 1000);
  }

  something();

  return <></>;
};

CustomStyles.propTypes = {};

const mapDispatchToProps = {
  moveTodoOrder: todosActions.moveTodoOrder,
  getReduxTodos: todosActions.getReduxTodos,
};

export default connect(null, mapDispatchToProps)(CustomStyles);
