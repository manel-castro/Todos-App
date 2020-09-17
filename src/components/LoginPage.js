import React, { useState } from "react";

const LoginPage = ({ userAccess, errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    userAccess({
      email,
      password,
      action: e.target.id,
    });
  };

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
        <h4>Email</h4>
        <input
          id="email"
          type="text"
          placeholder="Email Adress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h4>Password</h4>
        <input
          id="pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div style={{ color: "red" }}>
          {Object.keys(errors).map((key) => (
            <div id={key}>{errors[key]}</div>
          ))}
        </div>
        <div style={{ marginTop: 5 }}>
          <button
            id="login"
            className="btn"
            style={{ margin: 7, backgroundColor: "silver" }}
            onClick={onClick}
          >
            Login
          </button>
          <button
            id="signin"
            className="btn"
            style={{ margin: 7 }}
            onClick={onClick}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
