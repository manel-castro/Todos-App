import styled from "styled-components";

export const SubItemButtonWrap = styled.div`
  margin-left: 10px;
  opacity: 0.3;

  transition: all 0.1s ease;
  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const SubItemButton = styled.button`
  padding: 2px;
  border-radius: 6px;
  background-color: white;
  outline: none;
  border: none;
  font-size: 12px;

  ${SubItemButtonWrap}:hover & {
    background-color: rgb(238, 240, 240);
  }

  &:hover {
    cursor: pointer;
  }
`;
