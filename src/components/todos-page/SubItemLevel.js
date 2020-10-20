import React from "react";
import PropTypes from "prop-types";
import { hasChildren } from "../_helpers/subItemsHelpers";
import TextDisplay from "../common/TextDisplay";
import { ButtonWrap } from "../../globalStyles";
import {
  SubItemsContainer,
  ListItem,
  SubLevelButton,
} from "./SubItemLevel.elements.js";
// this is a recursive component, with conditions in order to skew the behavior.

function SubItemLevel({
  subItem,
  handleOpenLevel,
  openedSubItems = {},
  handleNewSubItem,
  handleModifySubItem,
  level,
}) {
  const childrenList = hasChildren(subItem);
  //  console.log(openedSubItems);
  if (level < 5) level++;
  console.log(Math.log(level));
  return (
    <>
      <SubItemsContainer>
        {Object.keys(childrenList).map((key) => {
          const isSubOpened =
            openedSubItems[key] !== undefined && openedSubItems[key] !== false;

          return (
            <div key={key}>
              <ListItem styleLevel={level}>
                <div>
                  <TextDisplay
                    text={childrenList[key].title}
                    fontSize={"15px"}
                    getNewValue={handleModifySubItem}
                    todoId={key}
                    checkErrors={() => {}}
                  />
                </div>
                <ButtonWrap>
                  <>
                    {isSubOpened || !childrenList[key].hasChildren ? (
                      <ButtonWrap
                        display={"flex-start"}
                        mobileDisplay={"flex-end"}
                      >
                        <SubLevelButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleNewSubItem(key);
                          }}
                        >
                          Add
                        </SubLevelButton>
                      </ButtonWrap>
                    ) : null}
                  </>
                  <>
                    {childrenList[key].hasChildren ? (
                      !isSubOpened ? (
                        <ButtonWrap
                          display={"flex-start"}
                          mobileDisplay={"flex-end"}
                        >
                          <SubLevelButton
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenLevel(key, true);
                            }}
                          >
                            Expand
                          </SubLevelButton>
                        </ButtonWrap>
                      ) : (
                        <>
                          <ButtonWrap
                            display={"flex-start"}
                            mobileDisplay={"flex-end"}
                          >
                            <SubLevelButton
                              onClick={(e) => {
                                e.preventDefault();
                                handleOpenLevel(key, false);
                              }}
                            >
                              Contract
                            </SubLevelButton>
                          </ButtonWrap>
                        </>
                      )
                    ) : null}
                  </>
                </ButtonWrap>
              </ListItem>
              {isSubOpened ? (
                <>
                  <SubItemLevel
                    subItem={subItem[key]}
                    handleOpenLevel={handleOpenLevel}
                    openedSubItems={openedSubItems}
                    handleNewSubItem={handleNewSubItem}
                    handleModifySubItem={handleModifySubItem}
                    level={level}
                  />
                </>
              ) : null}
            </div>
          );
        })}
      </SubItemsContainer>
    </>
  );
}

SubItemLevel.propTypes = {};

export default SubItemLevel;
