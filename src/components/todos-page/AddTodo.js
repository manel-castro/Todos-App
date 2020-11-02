import React, { useState } from "react";
import { connect } from "react-redux";
import * as todosActions from "../../redux/actions/todosActions";

import PropTypes from "prop-types";
import {
  AddNoteButtonWrap,
  AddNoteButton,
  LargeAddNoteButton,
  IconWrap,
  PencilIcon,
  AddIcon,
  ButtonText,
} from "./AddTodo.elements.js";
import { Spinner } from "../../globalStyles";

const AddTodo = ({ addTodo, anyTodoNew, todosExist, inProgress = [] }) => {
  const [addIcon, setAddIcon] = useState(false);
  // const handleMouse = (state) => {
  //   setAddIcon(state);
  // };
  const handleAddTodo = async () => {
    const containerRef = document.getElementById("todosLayoutId");
    // containerRef.scrollTop = 0;
    if (anyTodoNew.length > 0) {
      const elementDOM = document.getElementById(
        anyTodoNew + "textDisplayArea"
      );
      //      if (elementDOM) elementDOM.focus();
      //      return;
    } else {
      try {
        addTodo();
      } catch (err) {
        console.log("addTodo failed", err);
      }
    }
  };
  console.log("-------______", inProgress);

  return (
    <AddNoteButtonWrap todosExist={todosExist}>
      {todosExist ? (
        <AddNoteButton
          onClick={handleAddTodo}
          // onMouseEnter={() => handleMouse(true)}
          // onMouseLeave={() => handleMouse(false)}
          // onTouchStart={() => handleMouse(false)}
        >
          {inProgress.includes("add todo") ? (
            <Spinner fontSize="5px" size="8em" />
          ) : (
            <PencilIcon />
          )}
        </AddNoteButton>
      ) : (
        <LargeAddNoteButton
          onClick={handleAddTodo}
          // onMouseEnter={() => handleMouse(true)}
          // onMouseLeave={() => handleMouse(false)}
          // onTouchStart={() => handleMouse(false)}
        >
          {inProgress.addTodoButton ? (
            <Spinner fontSize="5px" size="10em" />
          ) : (
            <>
              <IconWrap>
                <PencilIcon />
              </IconWrap>
              <ButtonText>Add note</ButtonText>
            </>
          )}
        </LargeAddNoteButton>
      )}
    </AddNoteButtonWrap>
  );
};

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todosExist: PropTypes.bool.isRequired,
  inProgress: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownState) {
  let todoIds = state.todos.map((todo) => todo.id);
  let inProgressArray = state.callsInProgress.filter((item) => {
    return item === "addTodo";
  });
  return {
    anyTodoNew: state.todosExtra.isAnyNewTodoCount,
    todosExist: todoIds.length !== 0,
    inProgress: inProgressArray.addTodo,
  };
}
const mapDispatchToProps = {
  addTodo: todosActions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
