import React, { useState } from "react";
import * as todosActions from "../../redux/actions/todosActions";
import { connect } from "react-redux";
import SubItemLevel from "./SubItemLevel";

function SubItemLayout({ todo, openLevel, openedSubItems }) {
  const subItem = todo.subItems;

  const handleOpenLevel = (key, action) => {
    openLevel(todo.id, key, action);
  };
  return (
    <>
      <ul>
        <SubItemLevel
          subItem={subItem}
          handleOpenLevel={handleOpenLevel}
          openedSubItems={openedSubItems}
        />
      </ul>
    </>
  );
}

export function mapStateToProps(state, ownState) {
  return {
    subItem: ownState.todo.subItems,
    openedSubItems: ownState.todo.openedKeys ? ownState.todo.openedKeys : {},
  };
}

export const mapDispatchToProps = {
  //  //  getSubItemLevel: todosActions.getSubItemLevel,
  //  //  addSubItem: todosActions.addSubItem,
  openLevel: todosActions.openSubItemLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubItemLayout);
