import styled from "styled-components";
import { BsFillXCircleFill } from "react-icons/bs";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const LoginFormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-bottom: 0px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 350px;

  @media screen and (max-width: 500px) {
    padding: 5px;
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

export const LoginTitle = styled.h1`
  font-size: 24px;
  margin: 17px auto 20px auto;
`;

export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 500px) {
    width: 90vw;
  }
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
  width: 100%;
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
  background-color: ${({ theme }) => theme.darkgrey};
  color: white;
  width: 100%;
  height: 50px;
  font-size: 16px;
  outline: none;
  border: none;
  transition: all 0.15s ease;
  opacity: 1;

  @media screen and (max-width: 500px) {
    width: 75vw;
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const LoginErrors = styled.small`
  font-size: 11px;
  color: red;
  text-align: center;
  max-width: 90vw;
  height: 25px;
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
  border: 1px solid ${({ theme }) => theme.darkgrey};
  color: ${({ theme }) => theme.darkgrey};
  opacity: 0.8;
  width: 60%;
  margin: 5px auto;
  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.softwhite};
  }
`;

//Password Reset stylings: will open modal
export const PasswordResetWrap = styled.a`
  margin: 0px auto;
`;

export const PasswordResetLink = styled.p`
  text-decoration: none;
  font-size: 14px;
  color: ${({ theme }) => theme.hardgrey};
  text-align: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const PasswordResetModal = styled.div`
  display: ${({ isPasswordReset }) =>
    isPasswordReset ? "flex" : "none"}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const PasswordResetModalContent = styled.div`
  background-color: #fefefe;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 100px auto;
  padding: 20px;
	border: 1px solid ${({ theme }) => theme.midgrey};
	width: 370px;
	height: 230px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

	@media screen and (max-width: 500px){
		width: 95vw;
	}
  transition: all 0.4s ease;
	opacity: ${({ isPasswordReset }) => (isPasswordReset ? "1" : "0")});
`;

export const CrossContainer = styled.div`
  margin: -10px -10px auto auto;
  cursor: pointer;
`;

export const CloseModalCross = styled(BsFillXCircleFill)`
  font-size: 20px;
`;

export const PasswordResetButton = styled(SignInButton)`
  margin: 15px auto auto auto;
  padding: 5px;
  width: 50%;
  height: 50px;
`;

export const PasswordResetInputWrapper = styled(LoginInputWrapper)`
  color: black;
  width: 95%;
  height: 40%;
`;

export const PasswordResetInput = styled(LoginInput)`
  color: black;
  margin-top: 20px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0;
  }
`;
