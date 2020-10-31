import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as interactivityActions from "../redux/actions/interactivityActions";
import * as todosActions from "../redux/actions/todosActions";
import { dragTodo } from "./draggableElement/draggableElement";

const CustomStyles = ({
  getTodosInteractivity,
  moveTodoOrder,
  allTodoItemsMounted,
  areAllTodoItemsMounted,
  readyStateComplete,
}) => {
  //if this useEffect doesn't work, we'll need a redux action to indicate when todos are totally loaded.
  async function something() {
    let somethinG = true;
    var intr = setInterval(function () {
      console.log("------------", document.readyState);
      if (document.readyState === "complete") {
        clearInterval(intr);
        console.log("CSS LOADED", document.getElementById("TodoItemObserver"));
        dragTodo(getTodosInteractivity, moveTodoOrder);
      }
    }, 1000);
  }

  something();

  return <div>asf</div>;
};

CustomStyles.propTypes = {};

function mapStateToProps(state) {
  return {
    allTodoItemsMounted: state.interactivity.allTodoItemsMounted,
  };
}

const mapDispatchToProps = {
  getTodosInteractivity: interactivityActions.getTodosInteractivity,
  moveTodoOrder: todosActions.moveTodoOrder,
  areAllTodoItemsMounted: interactivityActions.areAllTodoItemsMounted,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomStyles);
