import React, { useState } from "react";
import * as todosActions from "../../redux/actions/todosActions";
import { connect } from "react-redux";
import { ButtonWrap } from "../../globalStyles.js";
import SubItemLevel from "./SubItemLevel";
import {
  SubItemLayoutContainer,
  SubItemLayoutExpandedWrap,
  SubItemButton,
} from "./SubItemLayout.elements";

function SubItemLayout({
  todo,
  openLevel,
  openedSubItems,
  currentLevel,
  addSubItem,
}) {
  const [expand, setExpand] = useState(false);
  const [openedLevel, setOpenedLevel] = useState({});
  const handleExpand = (status = false) => {
    // console.log("handleExpand: ", status);
    if (status) {
      setExpand(status);
    } else {
      setExpand(!expand);
    }
  };
  const subItem = todo.subItems;
  const existSubItem = Object.keys(subItem).length;
  const handleOpenLevel = (key, action) => {
    setOpenedLevel((prevState) => ({ ...prevState, [key]: action }));
    //openLevel(todo.id, key, action);
  };

  const handleNewSubItem = (subItemParentId = false) => {
    try {
      addSubItem(todo, subItemParentId);
      if (subItemParentId) {
        handleOpenLevel(subItemParentId, true);
      } else {
        setExpand(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  let level = 0;

  return (
    <SubItemLayoutContainer>
      {expand ? (
        <>
          <ButtonWrap
            color={"black"}
            display={"flex-start"}
            mobileDisplay={"center"}
          >
            <SubItemButton
              onClick={() => {
                handleNewSubItem();
              }}
            >
              Add
            </SubItemButton>
            <SubItemButton onClick={() => handleExpand(false)}>
              Contract
            </SubItemButton>
          </ButtonWrap>
          <SubItemLayoutExpandedWrap>
            <ul>
              <SubItemLevel
                subItem={subItem}
                handleOpenLevel={handleOpenLevel}
                openedSubItems={openedLevel}
                level={level}
                handleNewSubItem={handleNewSubItem}
              />
            </ul>
          </SubItemLayoutExpandedWrap>
        </>
      ) : existSubItem ? (
        <ButtonWrap display={"flex-start"} mobileDisplay={"center"}>
          <SubItemButton onClick={handleExpand}>Expand</SubItemButton>
        </ButtonWrap>
      ) : (
        <ButtonWrap>
          <SubItemButton
            onClick={() => {
              handleNewSubItem();
            }}
          >
            Add sub-item
          </SubItemButton>
        </ButtonWrap>
      )}
    </SubItemLayoutContainer>
  );
}

export function mapStateToProps(state, ownState) {
  return {
    subItem: ownState.todo.subItems,
    openedSubItems: ownState.todo.openedKeys ? ownState.todo.openedKeys : {},
    currentLevel: ownState.todo.currentLevel ? ownState.todo.currentLevel : 0,
  };
}

export const mapDispatchToProps = {
  //  //  getSubItemLevel: todosActions.getSubItemLevel,
  //  //  addSubItem: todosActions.addSubItem,
  openLevel: todosActions.openSubItemLevel,
  addSubItem: todosActions.addSubItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubItemLayout);
