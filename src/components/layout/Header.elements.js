import styled from "styled-components";
import { BasicLink } from "../../globalStyles";

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

export const StyledLink = styled(BasicLink)`
  color: #fff;
`;
