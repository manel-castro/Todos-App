import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ loggedUser, userLogout }) => {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>{" "}
      <Link style={linkStyle} to="/about">
        About
      </Link>{" "}
      <>
        {loggedUser ? (
          <>
            |{" "}
            <Link style={linkStyle} onClick={userLogout} to="/">
              Logout
            </Link>
          </>
        ) : (
          <>
            |{" "}
            <Link style={linkStyle} to="/login">
              Login
            </Link>
          </>
        )}
      </>
    </header>
  );
};

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

Header.propTypes = {
  loggedUser: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default Header;
