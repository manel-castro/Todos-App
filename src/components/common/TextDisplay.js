import React, { useState } from "react";
import PropTypes from "prop-types";

export function TextDisplayChild({
  text,
  fontSize,
  error,
  handleChange,
  handleOpen,
  open,
  validate,
}) {
  const handleFocus = () => {};
  return (
    <>
      {open ? (
        <div>
          <input
            style={{ fontSize: fontSize, border: "none", outline: "none" }}
            autoFocus
            onChange={handleChange}
            value={text}
            onBlur={validate}
            autoComplete="off"
          ></input>{" "}
          <small style={{ color: "red" }}>{error}</small>
        </div>
      ) : (
        <div onClick={() => handleOpen()} style={{ fontSize: fontSize }}>
          {text}
        </div>
      )}
    </>
  );
}

TextDisplayChild.propTypes = {};

function TextDisplay({ todoId, text, fontSize, error, getNewValue }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(text);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const validate = () => {
    getNewValue(todoId, value);
  };

  return (
    <div>
      <TextDisplayChild
        text={value}
        fontSize={fontSize}
        error={error}
        handleChange={handleChange}
        open={open}
        validate={validate}
        handleOpen={handleOpen}
      />
    </div>
  );
}

TextDisplay.propTypes = {};

export default TextDisplay;
