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
        >
          {addIcon ? <AddIcon /> : <PencilIcon />}
        </AddNoteButton>
      ) : (
        <LargeAddNoteButton
          onClick={onSubmit}
          onMouseEnter={() => handleMouse(true)}
          onMouseLeave={() => handleMouse(false)}
        >
          <IconWrap>{addIcon ? <AddIcon /> : <PencilIcon />}</IconWrap>
          <ButtonText>Add note</ButtonText>
        </LargeAddNoteButton>
      )}
    </AddNoteButtonWrap>
  );
};

AddTodo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddTodo;
