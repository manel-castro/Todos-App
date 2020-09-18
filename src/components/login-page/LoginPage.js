import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

const LoginPage = ({ userLogin, userSignup }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ default: 2 });
  const [saving, setSaving] = useState(false);
  //containerComponent and presentational component
  // Spinner on actions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { email, password } = user;
    console.log(typeof email);
    if (name === "login") userLogin({ email, password });
    if (name === "signup") userSignup({ email: email, password: password });
  };

  return (
    <>
      {/* {isLogged ? <Redirect to="/" /> : null} */}
      <LoginForm
        onSave={handleSave}
        onChange={handleChange}
        errors={errors}
        user={user}
        saving={saving}
      />
    </>
  );
};

// LoginPage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  // return { isLogged: state.user.length !== 0 ? true : false };
};
const mapDispatchToProps = {
  userLogin: userActions.userLogin,
  userSignup: userActions.userSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
