import React, { useState } from "react";
import { connect } from "react-redux";
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
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const inputIsValid = () => {
    const { email, password } = user;
    const isValidErrors = {};

    if (email.length === 0) {
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

  const loginReq = async (e) => {
    const { name } = e.target;
    const { email, password } = user;

    const validation = await !inputIsValid();
    if (validation) {
      console.log("errors");
      setSaving(false);
      return;
    }
    console.log("didnt reach");
    if (name === "login") {
      try {
        await userLogin({ email, password });
        setSaving(false);
      } catch (err) {
        console.log(err.message);
        setErrors({ onSave: err.message });
        setSaving(false);
      }
    }
    if (name === "signup") {
      try {
        await userSignup({ email, password });
        setSaving(false);
      } catch (err) {
        setErrors({ onSave: err.message });
        setSaving(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    await loginReq(e);
  };

  return (
    <>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
