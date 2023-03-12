import styled from "styled-components";

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
  color: ${({ theme }) => theme.footerText};
  margin-left: 10px;
  font-size: 0.9rem;
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.footerText};
  opacity: 1;
  
  &:hover {
    opacity: 0.7;
  }
`;
