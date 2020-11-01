import React, { useState, useEffect, useRef } from "react";
//import { useEventListener } from "../_helpers/hooks";
import PropTypes from "prop-types";

export function TextDisplayChild({
  text,
  isNew = false,
  fontSize,
  error,
  handleChange,
  handleColor,
  color,
  validate,
  saved = null,
  todoId,
}) {
  const handleFocus = () => {
    handleColor(true);
  };

  const handleBlur = () => {
    handleColor(false);
    validate();
  };

  const textArea = useRef(null);

  // The next code is made to autosize the input area.
  useEffect(
    function () {
      const sizeTimer = setTimeout(() => {
        //      console.log("SETTIMEOUT FIRED");
        textArea.current.style.height = "0px";
        textArea.current.style.height = textArea.current.scrollHeight + "px";
      }, 0);

  //    const validateTimer = setTimeout(() => {
  //      textArea.current.addEventListener("keypress", validate());
  //    }, 2000);
  //    return function () {
  //      //    console.log("CleanedTimeout");
  //      clearTimeout(sizeTimer);
  //      clearTimeout(validateTimer);
  //    };
    },
    [text]
  );

  //  The next code is made to autofocus when a todo is new.
  if (isNew) {
    useEffect(function () {
      textArea.current.focus();
    }, []);
  }

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
        id={todoId + "textDisplayArea"}
        ref={textArea}
        type="textarea"
        required
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></textarea>
      <small style={{ color: "red" }}>{error}</small>
      {/* ADd component here to say when saved
       */}
    </div>
  );
}

TextDisplayChild.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleColor: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

function TextDisplay({
  todoId,
  text,
  isNew = false,
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
      try {
        getNewValue(todoId, value, isNew);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <TextDisplayChild
        text={value}
        isNew={isNew}
        fontSize={fontSize}
        error={error}
        handleChange={handleChange}
        validate={validate}
        handleColor={handleColor}
        color={color}
        todoId={todoId}
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
  isNew: PropTypes.bool,
};

export default TextDisplay;
