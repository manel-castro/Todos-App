import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			font-family: arial, sans-serif;
			::selection {
				background: rgb(170, 170, 170);
			}
			::-moz-selection {
				background: rgb(170, 170, 170);
			}
		}
`;

export const Container = styled.div`
  display: flex;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
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

export default GlobalStyle;
