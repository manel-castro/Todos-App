import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>{" "}
      <Link style={linkStyle} to="/about">
        About
      </Link>{" "}
      <div>
        {props.loggedUser ? (
          <>
            |{" "}
            <Link style={linkStyle} onClick={props.logout} to="/">
              Logout
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default Header;
