import {
  LoginContainer,
  LoginFormWrap,
  LoginTitle,
  LoginInputWrapper,
  LoginTextInput,
  LoginInput,
  LoginButton,
} from "./LoginForm.elements.js";
import { Spinner } from "../../globalStyles";
import React from "react";

function LoginForm({ onChange, onSave, user, saving }) {
  return (
    <LoginContainer>
      <LoginFormWrap>
        <LoginTitle>Welcome</LoginTitle>
        <LoginInputWrapper>
          <LoginInput
            placeholder="Email address"
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
          />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <LoginInput
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </LoginInputWrapper>
        <LoginButton name="login" onClick={onSave}>
          {saving ? <Spinner fontSize="3px" size="10em" /> : "Log In"}
        </LoginButton>
      </LoginFormWrap>
    </LoginContainer>
  );
}

export default LoginForm;
