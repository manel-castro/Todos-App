import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export const TodoItemContainer = styled.div``;

export const TodoItemWrap = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TodoTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DeleteTodo = styled(DeleteForeverIcon)`
  color: pink;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const SubItemsContainer = styled.div`
  padding: 2px;
`;

