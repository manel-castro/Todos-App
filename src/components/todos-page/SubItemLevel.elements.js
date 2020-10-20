import styled from "styled-components";
import { SubItemButton } from "./SubItemLayout.elements";

export const SubItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const ListItem = styled.li`
  font-size: ${({ styleLevel }) => 1 - Math.log(styleLevel) / 6}rem;
  color: rgb(70, 70, 70);
  list-style: none;
  display: flex;
  margin-top: ${({ styleLevel }) => 1.2 - Math.log(styleLevel) / 1.5}rem;
  flex-direction: row;
  justify-content: flex-start;

  @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
`;

export const SubLevelButton = styled(SubItemButton)``;
