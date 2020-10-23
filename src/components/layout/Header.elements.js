import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  background: #333;
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  width: 100%;
  height: 70px;
  min-height: 70px;
`;

export const Title = styled.h1`
  color: #fff;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
