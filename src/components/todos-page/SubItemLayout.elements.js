import styled from "styled-components";

export const SubItemLayoutContainer = styled.div`
  padding: 0;
`;

export const SubItemLayoutExpandedWrap = styled.div`
  padding-left: 5px;
  margin-top: -0.3rem;
  margin-bottom: 0.7rem;
  padding-top: 15px;

  @media screen and (max-width: 500px) {
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
`;

export const SubItemButton = styled.button`
  padding: 2px;
  margin-left: 10px;
  border-radius: 6px;
  background-color: white;
  outline: none;
  border: none;
  font-size: 0.9rem;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 960px) {
    opacity: 0.5;
    &:hover {
      opacity: 0.5;
    }
  }
`;
