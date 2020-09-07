import React from "react";
// import firebase from "firebase";
// import firebaseui from "firebaseui";

/*
TODOS. 
- Check for errors, but if something not considered:
- Show errors from firebase catch. 
- Send to todos page
*/

class LoginPage extends React.Component {
  state = {
    email: "",
    pass: "",
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id === "login") {
      this.props.login({
        email: this.state.email,
        password: this.state.pass,
      });
    } else {
      this.props.signup({
        email: this.state.email,
        password: this.state.pass,
      });
    }
  };

  render() {
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
            value={this.state.email}
            onChange={this.onChange}
          ></input>
          <h4>Password</h4>
          <input
            id="pass"
            type="password"
            placeholder="Password"
            value={this.state.pass}
            onChange={this.onChange}
          ></input>
          <div style={{ color: "red" }}>
            {Object.keys(this.props.errors).map((key) => (
              <>{this.props.errors[key]}</>
            ))}
          </div>
          <div style={{ marginTop: 5 }}>
            <button
              id="login"
              className="btn"
              style={{ margin: 7, backgroundColor: "silver" }}
              onClick={this.onClick}
            >
              Login
            </button>
            <button
              id="signin"
              className="btn"
              style={{ margin: 7 }}
              onClick={this.onClick}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
