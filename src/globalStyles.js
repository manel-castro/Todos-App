import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
	* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			font-family: arial, sans-serif;
			::selection {
				background: rgb(200, 200, 200);
			}
			::-moz-selection {
				background: rgb(200, 200, 200);
			}
		}
		
	body {
		background-color: rgb(239, 240, 240);
	}
	
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  overflow-x: hidden;
`;

export const BasicLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: rgb(140, 150, 150);

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
border-radius: {({round}) => (round ? "4px" : "0px")};
padding: 10px 20px;
margin: 7px;
white-space: nowrap;
color: white;
background-color: {({primary}) => (primary ? "#293740" : "#435969")};
border: none; 
outline: none;
cursor: pointer;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ display }) => display};
  @media screen and (max-width: 500px) {
    justify-content: ${({ mobileDisplay }) => mobileDisplay};
  }
`;

export const Spinner = styled.div`
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  &:after {
    border-radius: 50%;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
  margin: 0px auto;
  font-size: ${({ fontSize }) => fontSize};
  position: relative;
  text-indent: -9999em;
  border-top: ${({ primary }) =>
    primary
      ? "1.1em solid rgb(150, 150, 150)"
      : "1.1em solid rgb(110, 110, 110)"};
  border-right: ${({ primary }) =>
    primary
      ? "1.1em solid rgb(150, 150, 150)"
      : "1.1em solid rgb(110, 110, 110)"};
  border-bottom: ${({ primary }) =>
    primary
      ? "1.1em solid rgb(150, 150, 150)"
      : "1.1em solid rgb(110, 110, 110)"};
  border-left: ${({ primary }) =>
    primary ? "1.1em solid #293740" : "1.1em solid #fff"};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0px;
`;

export const FooterWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 30px;
  background-color: white;
`;

export const FooterText = styled.p`
  color: rgb(140, 150, 150);
  margin-left: 10px;
`;

export default GlobalStyle;
