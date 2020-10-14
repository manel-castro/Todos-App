import React, { useState } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { validateEmail } from "../_helpers/validateEmail";

const LoginPage = ({ userLogin, userSignup, resetPassword }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    emailPassReset: "",
  });
  const [errors, setErrors] = useState({ email: "" });
  const [saving, setSaving] = useState({});
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  //containerComponent and presentational component
  // Spinner on actions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const isEmailValid = (email, isResetPass) => {
    let isValidErrors = {};
    let emailObj = "email";
    if (isResetPass) {
      emailObj = "emailPassReset";
    }

    if (email.length === 0) {
      isValidErrors[emailObj] = "Email is empty";
    } else if (!validateEmail(email)) {
      isValidErrors[emailObj] = "Email is badly formatted";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...isValidErrors }));
    return Object.keys(isValidErrors).length === 0;
  };

  const isPassValid = (pass) => {
    let isValidErrors = {};

    if (pass.length === 0) {
      isValidErrors.password = "Password is empty";
    } else if (pass.length < 6) {
      isValidErrors.password = "Password is not strong enough";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...isValidErrors }));
    return Object.keys(isValidErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSaving({ signup: true });
    const { email, password } = user;

    const emailValidation = await !isEmailValid(email);
    const passValidation = await !isPassValid(password);
    if (emailValidation || passValidation) {
      setSaving({});
      return;
    }
    try {
      await userSignup({ email, password });
      setSaving({});
    } catch (err) {
      setErrors({ signup: err.message });
      setSaving({});
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSaving({ login: true });

    const { email, password } = user;

    const emailValidation = await !isEmailValid(email);
    const passValidation = await !isPassValid(password);
    if (emailValidation || passValidation) {
      setSaving({});
      return;
    }

    try {
      await userLogin({ email, password });
      setSaving({});
    } catch (err) {
      setErrors({ login: err.message });
      setSaving({});
    }
  };

  const modalPassReset = () => {
    setIsPasswordReset(!isPasswordReset);
  };

  const handlePasswordReset = async () => {
    const validation = await !isEmailValid(user.emailPassReset, true);
    if (validation) {
      setSaving({});
      console.log("not valid");
      return;
    }

    try {
      await resetPassword(user.emailPassReset);
    } catch (err) {
      console.log(err);
      alert(err.message);
      setSaving({});
      return;
    }

    setErrors((prevState) => ({ ...prevState, emailPassReset: "" }));
    setSaving({});
    setIsPasswordReset(false);
    alert(
      "Follow the instructions of the email we sent to you, and then try to Log In."
    );
  };

  return (
    <>
      <LoginForm
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        onChange={handleChange}
        handlePasswordReset={handlePasswordReset}
        isPasswordReset={isPasswordReset}
        modalPassReset={modalPassReset}
        errors={errors}
        user={user}
        saving={saving}
      />
    </>
  );
};

LoginPage.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userSignup: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = {
  userLogin: userActions.userLogin,
  userSignup: userActions.userSignup,
  resetPassword: userActions.resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
