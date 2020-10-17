import React from "react";
import PropTypes from "prop-types";

const AddTodo = ({ onSubmit }) => {
  return <input type="submit" value="Add new note" onClick={onSubmit} />;
};

AddTodo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddTodo;
