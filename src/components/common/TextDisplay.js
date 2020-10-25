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
  validate,
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
    const timer = setTimeout(() => {
      console.log("SETTIMEOUT FIRED");
      textArea.current.style.height = "0px";
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }, 0);
    return () => clearTimeout(timer);
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
  );
}

TextDisplayChild.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
};

function TextDisplay({
  todoId,
  text,
  fontSize = "16px",
  colorOff = "black",
  colorActive = "grey",
  checkErrors = false,
  getNewValue,
}) {
  const [color, setColor] = useState(colorOff);
  const [value, setValue] = useState(text);
  const [error, setError] = useState("");
  let initialValue = text;

  const handleChange = (e) => {
    if (checkErrors) setError(checkErrors(e.target.value));
    setValue(e.target.value);
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
  };

  return (
    <div>
      <TextDisplayChild
        text={value}
        fontSize={fontSize}
        error={error}
        handleChange={handleChange}
        validate={validate}
        handleColor={handleColor}
        color={color}
      />
    </div>
  );
}

TextDisplay.propTypes = {
  todoId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  colorOff: PropTypes.string,
  colorActive: PropTypes.string,
  checkErrors: PropTypes.func,
  getNewValue: PropTypes.func.isRequired,
};

export default TextDisplay;
