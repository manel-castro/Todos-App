import React, { useState } from "react";
import * as todosActions from "../../redux/actions/todosActions";
import { connect } from "react-redux";
import SubItemLevel from "./SubItemLevel";
import { SubItemButtonWrap, SubItemButton } from "./SubItemLayout.elements";

function SubItemLayout({
  todo,
  openLevel,
  openedSubItems,
  currentLevel,
  addSubItem,
}) {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  const subItem = todo.subItems;
  const existSubItem = Object.keys(subItem).length;
  const handleOpenLevel = (key, action) => {
    openLevel(todo.id, key, action);
  };

  const handleNewSubItem = (subItemParentId) => {
    try {
      addSubItem(todo, subItemParentId);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("openedSubItems: ", openedSubItems);
  return (
    <>
      {expand ? (
        <>
          <SubItemButtonWrap>
            <SubItemButton onClick={handleExpand}>Contract</SubItemButton>
          </SubItemButtonWrap>
          <ul>
            <SubItemLevel
              subItem={subItem}
              handleOpenLevel={handleOpenLevel}
              openedSubItems={openedSubItems}
              level={currentLevel}
              handleNewSubItem={handleNewSubItem}
            />
          </ul>
        </>
      ) : existSubItem ? (
        <SubItemButtonWrap>
          <SubItemButton onClick={handleExpand}>Expand</SubItemButton>
        </SubItemButtonWrap>
      ) : (
        <SubItemButtonWrap>
          <SubItemButton onClick={() => addSubItem(todo)}>
            Add sub-item
          </SubItemButton>
        </SubItemButtonWrap>
      )}
    </>
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
