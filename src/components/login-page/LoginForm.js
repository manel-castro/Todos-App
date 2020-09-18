import React from "react";
import TextInput from "../common/TextInput";

function LoginForm({ onChange, onSave, user, errors, saving }) {
  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        marginTop: "20vh",
        maxWidth: "30vw",
      }}
    >
      <h2>Sign in / Login</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
        }}
      >
        <TextInput
          name="email"
          label="Email"
          type="text"
          placeholder="Email Adress"
          value={user.email}
          onChange={onChange}
          error={errors.email}
        />
        <TextInput
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={onChange}
          errors={errors.password}
        />
        <div style={{ color: "red" }}>
          {Object.keys(errors).map((key) => (
            <div id={key}>{errors[key]}</div>
          ))}
        </div>
        <div style={{ marginTop: 5 }}>
          <button
            name="login"
            className="btn"
            style={{ margin: 7, backgroundColor: "silver" }}
            onClick={onSave}
          >
            Login
          </button>
          <button
            name="signup"
            className="btn"
            style={{ margin: 7 }}
            onClick={onSave}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
