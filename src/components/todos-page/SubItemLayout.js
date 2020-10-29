import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as todosActions from "../../redux/actions/todosActions";
import { connect } from "react-redux";
import { ButtonWrap } from "../../globalStyles.js";
import SubItemLevel from "./SubItemLevel";
import {
  SubItemLayoutContainer,
  SubItemLayoutExpandedWrap,
  SubItemButton,
} from "./SubItemLayout.elements";

function SubItemLayout({ todo, addSubItem, modifySubItem, deleteSubItem }) {
  const [expand, setExpand] = useState(false);
  const [openedLevel, setOpenedLevel] = useState({});

  const subItem = todo.subItems;
  const existSubItemFunc = () => {
    return Object.keys(subItem).length !== 0;
  };

  let existSubItem = existSubItemFunc();



  //  useEffect(() => {
  //    existSubItem = Object.keys(subItem).length;
  //  }, [subItem]);

  const handleExpand = (status = false) => {
    if (status) {
      setExpand(status);
    } else {
      setExpand(!expand);
    }
  };

  const handleOpenLevel = (key, action) => {
    setOpenedLevel((prevState) => ({ ...prevState, [key]: action }));
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

  const handleModifySubItem = (subItemId, subItemText) => {
    try {
      modifySubItem(todo, subItemId, subItemText);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSubItem = async (
    subItemId,
    subItemLevel,
    subItemChildrenList
  ) => {
    try {
      deleteSubItem(todo, subItemId);
      handleOpenLevel(subItemId, false);
      if (subItemLevel === 1 && Object.keys(subItemChildrenList).length === 1)
        setExpand(false);
    } catch (err) {
      console.log(err);
    }
  };

  let level = 0;
  let isMaxLevel = false;

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
            <SubItemLevel
              subItem={subItem}
              handleOpenLevel={handleOpenLevel}
              openedSubItems={openedLevel}
              level={level}
              isMaxLevel={isMaxLevel}
              handleNewSubItem={handleNewSubItem}
              handleModifySubItem={handleModifySubItem}
              handleDeleteSubItem={handleDeleteSubItem}
            />
          </SubItemLayoutExpandedWrap>
        </>
      ) : existSubItem ? (
        <ButtonWrap display={"flex-start"} mobileDisplay={"center"}>
          <SubItemButton onClick={handleExpand}>Expand</SubItemButton>
        </ButtonWrap>
      ) : (
            <ButtonWrap display={"flex-start"} mobileDisplay={"center"}>
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

SubItemLayout.propTypes = {
  todo: PropTypes.object.isRequired,
  addSubItem: PropTypes.func.isRequired,
  modifySubItem: PropTypes.func.isRequired,
  deleteSubItem: PropTypes.func.isRequired,
};

export function mapStateToProps(state, ownState) {
  return {
    subItem: ownState.todo.subItems,
    openedSubItems: ownState.todo.openedKeys ? ownState.todo.openedKeys : {},
  };
}

export const mapDispatchToProps = {
  //  //  getSubItemLevel: todosActions.getSubItemLevel,
  //  //  addSubItem: todosActions.addSubItem,
  addSubItem: todosActions.addSubItem,
  modifySubItem: todosActions.modifySubItem,
  deleteSubItem: todosActions.deleteSubItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubItemLayout);
