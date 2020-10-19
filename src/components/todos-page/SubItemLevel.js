import React from "react";
import PropTypes from "prop-types";
import { hasChildren } from "../_helpers/subItemsHelpers";
import {
  SubItemsContainer,
  ListItem,
  SubLevelButtonWrap,
  SubLevelButton,
} from "./SubItemLevel.elements.js";
// this is a recursive component, with conditions in order to skew the behavior.

function SubItemLevel({
  subItem,
  handleOpenLevel,
  openedSubItems = {},
  handleNewSubItem,
  addSubItem,
  level,
}) {
  const childrenList = hasChildren(subItem);
  console.log(openedSubItems);
  return (
    <SubItemsContainer>
      {Object.keys(childrenList).map((key) => {
        const isSubOpened =
          openedSubItems[key] !== undefined && openedSubItems[key] !== false;

        return (
          <>
            <ListItem level={level} key={key}>
              <>{childrenList[key].title}</>
              <>
                {isSubOpened || !childrenList[key].hasChildren ? (
                  <SubLevelButtonWrap>
                    <SubLevelButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleNewSubItem(key);
                      }}
                    >
                      Add
                    </SubLevelButton>
                  </SubLevelButtonWrap>
                ) : null}
              </>
              <>
                {childrenList[key].hasChildren ? (
                  !isSubOpened ? (
                    <SubLevelButtonWrap>
                      <SubLevelButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenLevel(key, true);
                        }}
                      >
                        Expand
                      </SubLevelButton>
                    </SubLevelButtonWrap>
                  ) : (
                    <>
                      <SubLevelButtonWrap>
                        <SubLevelButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleOpenLevel(key, false);
                          }}
                        >
                          Contract
                        </SubLevelButton>
                      </SubLevelButtonWrap>
                    </>
                  )
                ) : null}
              </>
            </ListItem>
            {isSubOpened ? (
              <>
                {console.log("rendered child, level: ", level)}

                <ul>
                  <SubItemLevel
                    subItem={subItem[key]}
                    handleOpenLevel={handleOpenLevel}
                    openedSubItems={openedSubItems}
                    handleNewSubItem={handleNewSubItem}
                  />
                </ul>
              </>
            ) : null}
          </>
        );
      })}
    </SubItemsContainer>
  );
}

SubItemLevel.propTypes = {};

export default SubItemLevel;
