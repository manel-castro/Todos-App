import React from "react";
import PropTypes from "prop-types";

const AddTodo = ({ onChange, onSubmit, title, placeholder }) => {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex" }}>
      <input
        type="text"
        name="title"
        style={{ flex: "10", padding: "5px" }}
        placeholder={placeholder}
        value={title}
        onChange={onChange}
        autoComplete="off"
      />
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: "1" }}
      />
    </form>
  );
};

AddTodo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddTodo;
