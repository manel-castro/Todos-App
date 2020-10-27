import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyledHeader, Title, NavBar, StyledLink } from "./Header.elements";
import { userLogout } from "../../redux/actions/userActions";
import { deleteAllTodos } from "../../redux/actions/todosActions";

const Header = ({ userLogout, loggedIn, deleteAllTodos }) => {
  return (
    <StyledHeader>
      <Title>TodoList</Title>
      <NavBar>
        {loggedIn ? (
          <>
            <StyledLink onClick={userLogout} to="/">
              Logout
            </StyledLink>
            <>{"  "}</>
            <p onClick={() => deleteAllTodos()}>Delete All</p>
          </>
        ) : null}
      </NavBar>
    </StyledHeader>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn === null ? false : state.user.loggedIn,
  };
}

const mapDispatchToProps = {
  userLogout: userLogout,
  deleteAllTodos: deleteAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
