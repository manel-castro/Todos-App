import {
  LoginContainer,
  LoginFormWrap,
  LoginTitle,
  LoginInputWrapper,
  LoginTextInput,
  LoginInput,
  LoginButton,
  LoginErrors,
  LoginDivider,
  SignInButton,
  PasswordResetLink,
  PasswordResetWrap,
  PasswordResetModal,
  PasswordResetModalContent,
  CloseModalCross,
  PasswordResetButton,
  PasswordResetInputWrapper,
  PasswordResetInput,
} from "./LoginForm.elements.js";
import { Spinner } from "../../globalStyles";
import React from "react";

function LoginForm({
  onChange,
  handleLogin,
  handleSignup,
  handlePasswordReset,
  isPasswordReset,
  modalPassReset,
  user,
  saving,
  errors,
}) {
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
        <LoginButton name="login" onClick={handleLogin}>
          {saving.login ? <Spinner fontSize="3px" size="10em" /> : "Log In"}
        </LoginButton>
        <LoginErrors>{errors.onSave}</LoginErrors>
        <PasswordResetWrap>
          <PasswordResetLink onClick={modalPassReset}>
            Forgot your password?
          </PasswordResetLink>
        </PasswordResetWrap>
        <LoginDivider />

        <SignInButton name="signup" onClick={handleSignup}>
          {saving.signup ? <Spinner fontSize="3px" size="10em" /> : "Sign In"}
        </SignInButton>
      </LoginFormWrap>
      <PasswordResetModal isPasswordReset={isPasswordReset}>
        <PasswordResetModalContent isPasswordReset={isPasswordReset}>
          <CloseModalCross />
          <p> You'll recive an email with a link to reset your password.</p>
          <PasswordResetInputWrapper>
            <PasswordResetInput
              placeholder="Email address"
              type="text"
              name="emailPassReset"
              value={user.emailPassReset}
              onChange={onChange}
            />
            <LoginErrors>{errors.emailResetPass}</LoginErrors>
          </PasswordResetInputWrapper>
          <PasswordResetButton onClick={handlePasswordReset}>
            Send email
          </PasswordResetButton>
        </PasswordResetModalContent>
      </PasswordResetModal>
    </LoginContainer>
  );
}

export default LoginForm;
