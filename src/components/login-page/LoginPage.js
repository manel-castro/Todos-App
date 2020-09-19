import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { validateEmail } from "../_helpers/validateEmail";

const LoginPage = ({ userLogin, userSignup }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ errors: "" });
  const [saving, setSaving] = useState(false);
  //containerComponent and presentational component
  // Spinner on actions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    console.log(user);
  };

  const inputIsValid = () => {
    const { email, password } = user;
    const isValidErrors = {};
    const regEx = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/;
    if (email.length === 0) {
      console.log("fired");
      isValidErrors.email = "Email is empty";
    } else if (!validateEmail(email)) {
      isValidErrors.email = "Email is badly formatted";
    }
    if (password.length === 0) {
      isValidErrors.password = "Password is empty";
    } else if (password.length < 6) {
      isValidErrors.password = "Password is not strong enough";
    }
    setErrors({ ...isValidErrors });
    return Object.keys(isValidErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { email, password } = user;

    const validation = await !inputIsValid();
    if (validation) return;

    if (name === "login") {
      try {
        await userLogin({ email, password });
      } catch (err) {
        setErrors({ onSave: err.message });
      }
    }
    if (name === "signup") {
      try {
        await userSignup({ email, password });
      } catch (err) {
        setErrors({ onSave: err.message });
      }
    }
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
