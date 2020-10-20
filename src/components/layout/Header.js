import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogout } from "../../redux/actions/userActions";

const Header = ({ userLogout, loggedIn }) => {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>{" "}
      <Link style={linkStyle} to="/about">
        About
      </Link>{" "}
      <>
        {loggedIn ? (
          <>
            |{" "}
            <Link style={linkStyle} onClick={userLogout} to="/">
              Logout
            </Link>
          </>
        ) : null}
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
  loggedIn: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.user.loggedIn === null ? false : state.user.loggedIn,
  };
}

const mapDispatchToProps = {
  userLogout: userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
