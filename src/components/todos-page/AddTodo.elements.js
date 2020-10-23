import styled, { css } from "styled-components";
import { BsPen, BsPlus } from "react-icons/bs";

export const AddNoteButtonWrap = styled.div`
  position: absolute;
  z-index: 999;
  top: auto;
  bottom: 2vh;
  right: auto;
  left: 4vw;

  ${({ todosExist }) =>
    todosExist === false &&
    css`
      bottom: auto;
      left: calc(50% - 75px);
      top: 100px;
    `}
`;

export const AddNoteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  outline: none;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

export const LargeAddNoteButton = styled(AddNoteButton)`
  width: 100px;
  border-radius: 20%;
  width: 150px;
  height: 50px;
`;

export const IconWrap = styled.div`
  width: 30px;
  margin-right: 5px;
`;

export const PencilIcon = styled(BsPen)`
  color: white;
  font-size: 20px;
`;

export const AddIcon = styled(BsPlus)`
  color: white;
  font-size: 30px;
`;

export const ButtonText = styled.h4`
  color: white;
`;
