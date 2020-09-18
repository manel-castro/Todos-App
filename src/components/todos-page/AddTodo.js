import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [placeholder, setPlaceHolder] = useState("Add todo...");

  const onSubmit = (e) => {
    e.preventDefault();
    const regEx = /^[A-Za-z]/;
    if (title === "" || !regEx.test(title)) {
      setPlaceHolder("We need some letters");
      setTitle("");
      return 0;
    }
    if (title.length > 100) {
      setPlaceHolder("Title too long");
      setTitle("");
      return 0;
    }
    addTodo(title);
    setTitle("");
    setPlaceHolder("Add todo...");
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "flex" }}>
      <input
        type="text"
        name="title"
        style={{ flex: "10", padding: "5px" }}
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
