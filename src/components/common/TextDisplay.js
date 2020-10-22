import React, { useState, useEffect, useRef } from "react";
//import { useEventListener } from "../_helpers/hooks";
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
  inputWidth,
}) {
  console.log("COMPONENT RERENDERED");
  const handleFocus = () => {
    handleColor(true);
  };
  const handleBlur = () => {
    handleColor(false);
    validate();
  };

  const textArea = useRef(null);

  //here i use useEffect
  useEffect(() => {
    console.log(textArea.current.scrollHeight);
    //autosize(textArea.current);
    setTimeout(() => {
      textArea.current.style.height = "0px";
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }, 0);
  }, [text]);

  // --------------
  // the following code is useful when we want to manage keypress behaviors, to navigate between todos...
  // function autosize() {
  //   var el = this;
  //   console.log("rendered:");
  //   setTimeout(() => {
  //     el.style.height = "0px";
  //     el.style.height = el.scrollHeight + "px";
  //   }, 0);
  // }
  // useEventListener(textArea, "keydown", autosize);
  // ---------------
  return (
    <div style={{ cursor: "text" }}>
      {true ? (
        <div style={{ width: "100%" }}>
          <textarea
            style={{
              color: color,
              fontSize: fontSize,
              border: "none",
              outline: "none",
              resize: "none",
              width: "100%",
              overflow: "hidden",
              maxWidth: "100%",
              paddingRight: "10px",
            }}
            ref={textArea}
            type="textarea"
            required
            value={text}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></textarea>
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
  const [inputWidth, setInputWidth] = useState(text.length);
  const [error, setError] = useState("");
  let initialValue = text;

  const handleChange = (e) => {
    handleInputWidth();
    if (checkErrors) setError(checkErrors(e.target.value));
    setValue(e.target.value);
  };

  const handleInputWidth = () => {
    setInputWidth(value.length);
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
        inputWidth={inputWidth}
      />
    </div>
  );
}

TextDisplay.propTypes = {};

export default TextDisplay;
