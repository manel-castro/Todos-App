import React from "react";

function TextInput({ name, label, type, placeholder, value, onChange, error }) {
  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
      }}
    >
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></input>
        {error && <div style={{ fontSize: 10 }}>{error}</div>}
      </div>
    </div>
  );
}

export default TextInput;
