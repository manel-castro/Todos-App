import styled from "styled-components";

export const SubItemLayoutContainer = styled.div`
  padding: 0;
`;

export const SubItemLayoutExpandedWrap = styled.div`
  padding-left: 5px;
  padding-top: -5px;
`;

export const SubItemButton = styled.button`
  padding: 2px;
  margin-left: 10px;
  border-radius: 6px;
  background-color: white;
  outline: none;
  border: none;
  font-size: 12px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const MultipleButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;
