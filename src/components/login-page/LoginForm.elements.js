import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  margin-top: 60px;
  align-items: center;
  padding: 10px;

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

  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

export const LoginTitle = styled.h1`
  font-size: 24px;
  margin: 17px auto 17px auto;
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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
  width: 400px;
  color: black;
  background-color: white;
  font-size: 16px;
  outline: none;

  @media screen and (max-width: 500px) {
    width: 90%;
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
  width: 230px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  transition: all 0.15s ease;

  @media screen and (min-width: 500px) {
    width: 90%;
  }

  &:hover {
    background-color: rgb(85, 85, 85);
    cursor: pointer;
  }
`;
