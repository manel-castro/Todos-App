import styled from "styled-components";
import { BasicLink } from "../../globalStyles";

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.primaryElements};
  display: flex;
  flex-direction: column-reverse;
  padding: 5px 10px;
  width: 100%;
  height: 70px;
  min-height: 70px;
`;

export const Title = styled.h1`
  color: white;
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledLink = styled(BasicLink)`
  color: white;
  font-size: 1.1rem;

  @media screen and (max-width: 960px) {
    text-decoration: underline;
  }
`;
