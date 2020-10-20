import React, { useState } from "react";
import PropTypes from "prop-types";

export function TextDisplayChild({
  text,
  fontSize,
  error,
  handleChange,
  handleColor,
  color,
  handleOpen,
  open,
  validate,
}) {
  const handleFocus = () => {
    handleColor(true);
  };
  const handleBlur = () => {
    handleColor(false);
    validate();
  };
  return (
    <div style={{ cursor: "text" }}>
      {true ? (
        <div>
          <input
            style={{
              color: color,
              fontSize: fontSize,
              border: "none",
              outline: "none",
            }}
            autoFocus
            onChange={handleChange}
            value={text}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          ></input>{" "}
          <small style={{ color: "red" }}>{error}</small>
        </div>
      ) : (
        <div onClick={() => handleOpen()} style={{ fontSize: fontSize }}>
          {text}
        </div>
      )}
    </div>
  );
}

TextDisplayChild.propTypes = {};

function TextDisplay({
  todoId,
  text,
  fontSize = "16px",
  colorOff = "black",
  colorActive = "grey",
  checkErrors = false,
  getNewValue,
}) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(colorOff);
  const [value, setValue] = useState(text);
  const [error, setError] = useState("");
  let initialValue = text;

  const handleChange = (e) => {
    if (checkErrors) setError(checkErrors(e.target.value));
    setValue(e.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleColor = (active) => {
    if (active) {
      setColor(colorActive);
    } else {
      setColor(colorOff);
    }
  };

  const validate = () => {
    if (error && error.length !== 0 && checkErrors !== false) {
      setValue(initialValue);
      setError("");
      return;
    }
    if (initialValue !== value) {
      getNewValue(todoId, value);
      console.log("firestore");
      //			initialValue = value;
    }
    setOpen(false);
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
        handleColor={handleColor}
        color={color}
      />
    </div>
  );
}

TextDisplay.propTypes = {};

export default TextDisplay;
