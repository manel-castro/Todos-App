import React, { useState } from "react";
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

const AddTodo = ({ onSubmit, todosExist }) => {
  const [addIcon, setAddIcon] = useState(false);
  const handleMouse = (state) => {
    setAddIcon(state);
  };
  return (
    <AddNoteButtonWrap todosExist={todosExist}>
      {todosExist ? (
        <AddNoteButton
          onClick={onSubmit}
          onMouseEnter={() => handleMouse(true)}
          onMouseLeave={() => handleMouse(false)}
          onTouchStart={() => handleMouse(false)}
        >
          {addIcon ? <AddIcon /> : <PencilIcon />}
        </AddNoteButton>
      ) : (
        <LargeAddNoteButton
          onClick={onSubmit}
          onMouseEnter={() => handleMouse(true)}
          onMouseLeave={() => handleMouse(false)}
          onTouchStart={() => handleMouse(false)}
        >
          <IconWrap>{addIcon ? <AddIcon /> : <PencilIcon />}</IconWrap>
          <ButtonText>Add note</ButtonText>
        </LargeAddNoteButton>
      )}
    </AddNoteButtonWrap>
  );
};

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todosExist: PropTypes.bool.isRequired,
};

export default AddTodo;
