import styled from "styled-components";
import { SubItemButton } from "./SubItemLayout.elements";
import { DeleteTodo } from "./TodoItem.elements";

export const SubItemsContainer = styled.div`
  margin-left: 20px;
`;

export const ListItem = styled.div`
  list-style: none;
  display: flex;
  margin-top: ${({ styleLevel }) => 1.22 - 0.8 * Math.log(styleLevel)}rem;
  flex-direction: row;
  justify-content: flex-start;

  @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
`;

export const SubLevelButton = styled(SubItemButton)``;
export const DeleteSubLevel = styled(DeleteTodo)`
  font-size: 22px;
  margin-left: 7px;
`;
