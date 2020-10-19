import styled from "styled-components";
import { SubItemButtonWrap, SubItemButton } from "./SubItemLayout.elements";

export const SubItemsContainer = styled.div`
  background: rgb(239, 240, 240);
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  list-style: none;
  margin-left: 15px;
  margin-top: ${({ level }) => `${10 - level * 2}px`};
  display: flex;
  flex-direction: row;
`;

export const SubLevelButtonWrap = styled(SubItemButtonWrap)``;
export const SubLevelButton = styled(SubItemButton)``;
