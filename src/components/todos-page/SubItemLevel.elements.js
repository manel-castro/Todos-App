import styled from "styled-components";
import { SubItemButton } from "./SubItemLayout.elements";

export const SubItemsContainer = styled.div`
  margin-left: 20px;
`;

export const ListItem = styled.div`
  font-size: ${({ styleLevel }) => 1 - (0.8 * Math.log(styleLevel)) / 5}rem;
  color: rgb(70, 70, 70);
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
