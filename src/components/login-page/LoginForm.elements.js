import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

export const LoginFormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 440px;

  @media screen and (max-width: 500px) {
    padding: 5px;
    max-width: 95vw;
  }
`;

export const LoginTitle = styled.h1`
  font-size: 24px;
  margin: 17px auto 17px auto;
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: center;
`;

export const LoginTextInput = styled.h5`
  font-size: 14px;
  text-decoration: none;
  display: flex;
`;

export const LoginInput = styled.input`
  border-radius: 8px;
  border: 1px solid rgb(220, 242, 242);
  box-sizing: border-box;
  padding: 14px 16px;
  width: 350px;
  color: black;
  background-color: white;
  font-size: 16px;
  outline: none;

  @media screen and (max-width: 500px) {
    width: 90vw;
  }

  &:focus {
    outline: none;
    border: 1px solid rgb(170, 170, 170);
    box-shadow: 0px 2px 5px rgb(170, 170, 170);
    ::-webkit-input-placeholder {
      /* Edge */
      color: rgb(170, 170, 170);
    }

    :-ms-input-placeholder {
      /* Internet Explorer */
      color: rgb(170, 170, 170);
    }

    ::placeholder {
      color: rgb(170, 170, 170);
    }
  }
`;

export const LoginButton = styled.button`
  border-radius: 8px;
  background-color: rgb(70, 70, 70);
  color: white;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  transition: all 0.15s ease;

  @media screen and (max-width: 500px) {
    width: 75vw;
  }

  &:hover {
    background-color: rgb(85, 85, 85);
    cursor: pointer;
  }
`;

export const LoginErrors = styled.small`
  font-size: 11px;
  color: red;
  text-align: center;
  max-width: 90vw;
`;

export const PasswordReset = styled.a`
  text-decoration: none;
  font-size: 14px;
  color: rgb(70, 70, 70);
  text-align: center;
  margin: 5px auto;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const LoginDivider = styled.hr`
  border-top: 1px solid rgb(220, 242, 242);
  border-left: 0;
  border-right: 0;
  margin: 20px auto;
  width: 95%;
`;

export const SignInButton = styled(LoginButton)`
  background-color: #fff;
  border: 1px solid rgb(150, 150, 150);
  color: rgb(80, 80, 80);
  width: 60%;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
