import React from "react";

function TextInput({ name, label, type, placeholder, value, onChange, error }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></input>
        {error && <div>{error}</div>}
      </>
    </>
  );
}

export default TextInput;
