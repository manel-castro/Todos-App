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

const AddTodo = ({ addTodo, anyTodoNew, todosExist, buttonInProgress }) => {
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
      console.log(document.hasFocus());
      if (elementDOM) elementDOM.focus();
    } else {
      try {
        addTodo();
      } catch (err) {
        console.log("addTodo failed", err);
      }
    }
  };

  return (
    <AddNoteButtonWrap todosExist={todosExist}>
      {todosExist ? (
        <AddNoteButton
          onClick={handleAddTodo}
          // onMouseEnter={() => handleMouse(true)}
          // onMouseLeave={() => handleMouse(false)}
          // onTouchStart={() => handleMouse(false)}
        >
          {buttonInProgress ? (
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
          {buttonInProgress ? (
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
  todosExist: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  let todoIds = state.todos.map((todo) => todo.id);
  return {
    anyTodoNew: state.todosExtra.isAnyNewTodoCount, //for avoiding create more than one new
    todosExist: todoIds.length !== 0, //for button styling
    buttonInProgress: state.callsInProgress.find(
      ({ id }) => id === "addTodoButton"
    ), //for spinner
  };
}
const mapDispatchToProps = {
  addTodo: todosActions.addTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
