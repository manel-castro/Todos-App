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
      bottom: 100px;
      left: calc(50% - 100px);
    `}
`;

export const AddNoteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  outline: none;
  border: none;
  background: ${({ theme }) => theme.darkgrey};
  color: white;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

export const LargeAddNoteButton = styled(AddNoteButton)`
  border-radius: 20%;
  width: 200px;
  height: 70px;
`;

export const IconWrap = styled.div`
  width: 50px;
  margin-right: 5px;
`;

export const PencilIcon = styled(BsPen)`
  color: white;
  font-size: 30px;
`;

export const AddIcon = styled(BsPlus)`
  color: white;
  font-size: 30px;
`;

export const ButtonText = styled.h4`
  color: white;
  font-size: 1.1rem;
`;
