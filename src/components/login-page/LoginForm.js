import {
  LoginContainer,
  LoginFormWrap,
  LoginTitle,
  LoginInputWrapper,
  LoginTextInput,
  LoginInput,
  LoginButton,
  LoginErrors,
  PasswordReset,
  LoginDivider,
  SignInButton,
} from "./LoginForm.elements.js";
import { Spinner } from "../../globalStyles";
import React from "react";

function LoginForm({ onChange, onSave, user, saving, errors }) {
  return (
    <LoginContainer>
      <LoginFormWrap>
        <LoginTitle>Hey, writer!</LoginTitle>
        <LoginInputWrapper>
          <LoginInput
            placeholder="Email address"
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
          />
          <LoginErrors>{errors.email}</LoginErrors>
        </LoginInputWrapper>
        <LoginInputWrapper>
          <LoginInput
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
          <LoginErrors>{errors.password}</LoginErrors>
        </LoginInputWrapper>
        <LoginButton name="login" onClick={onSave}>
          {saving ? <Spinner fontSize="3px" size="10em" /> : "Log In"}
        </LoginButton>
        <LoginErrors>{errors.onSave}</LoginErrors>
        <PasswordReset>Forgot your password?</PasswordReset>
        <LoginDivider />

        <SignInButton>Sign In</SignInButton>
      </LoginFormWrap>
    </LoginContainer>
  );
}

export default LoginForm;
