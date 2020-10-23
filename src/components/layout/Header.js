import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyledHeader, Title, NavBar, StyledLink } from "./Header.elements";
import { userLogout } from "../../redux/actions/userActions";

const Header = ({ userLogout, loggedIn }) => {
  return (
    <StyledHeader>
      <Title>TodoList</Title>
      <NavBar>
        {loggedIn ? (
          <>
            <StyledLink onClick={userLogout} to="/">
              Logout
            </StyledLink>
          </>
        ) : null}
      </NavBar>
    </StyledHeader>
  );
};

const headerStyle = {};

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
