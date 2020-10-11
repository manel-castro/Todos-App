import React from "react";
import TextInput from "../common/TextInput";

function LoginForm({ onChange, onSave, user, errors, saving }) {
  return (
    <div
      style={{
        margin: "auto",
        width: 300,
        textAlign: "center",
        marginTop: "20vh",
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
          error={errors.password}
        />
        <div style={{ color: "red" }}>{errors.onSave}</div>
        <div style={{ marginTop: 5 }}>
          <button
            name="login"
            className="btn"
            style={{ margin: 7, backgroundColor: "silver" }}
            onClick={onSave}
            saving={saving}
          >
            Login
          </button>
          <button
            name="signup"
            className="btn"
            style={{ margin: 7 }}
            onClick={onSave}
            saving={saving}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
