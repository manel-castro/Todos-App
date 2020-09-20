import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogout } from "../../redux/actions/userActions";

const Header = ({ userLogout }) => {
  const isLogged = true;
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>{" "}
      <Link style={linkStyle} to="/app">
        About
      </Link>{" "}
      <>
        {isLogged ? (
          <>
            |{" "}
            <Link style={linkStyle} onClick={userLogout} to="/">
              Logout
            </Link>
          </>
        ) : (
          <>
            |{" "}
            <Link style={linkStyle} to="/">
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
  // isLogged: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // isLogged: state.user.length !== 0 ? true : false,
  };
}

const mapDispatchToProps = {
  userLogout: userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
