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
}) => {
  //if this useEffect doesn't work, we'll need a redux action to indicate when todos are totally loaded.
  useEffect(async () => {
    if (!allTodoItemsMounted) {
      await areAllTodoItemsMounted();
    } else {
      //   dragTodo(getTodosInteractivity, moveTodoOrder);
      console.log("ALL TODOS MOUNTED");
    }
  }, []);

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
