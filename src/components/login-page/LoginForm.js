import {
  LoginContainer,
  LoginWrap,
  LoginTitle,
  LoginInputWrapper,
  LoginTextInput,
  LoginInput,
  LoginButton,
} from "./LoginForm.elements.js";

import React from "react";

function LoginForm({}) {
  return (
    <LoginContainer>
      <LoginWrap>
        <LoginTitle>Welcome</LoginTitle>
        <LoginInputWrapper>
          <LoginInput placeholder="Email address" type="text" name="Password" />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <LoginInput placeholder="Password" type="password" name="Password" />
        </LoginInputWrapper>
        <LoginButton>Log In</LoginButton>
      </LoginWrap>
    </LoginContainer>
  );
}

export default LoginForm;
