import React from "react";
import PropTypes from "prop-types";
import { hasChildren } from "../_helpers/subItemsHelpers";
import TextDisplay from "../common/TextDisplay";
import { ButtonWrap } from "../../globalStyles";
import {
  SubItemsContainer,
  ListItem,
  SubLevelButton,
  DeleteSubLevel,
} from "./SubItemLevel.elements.js";
// this is a recursive component, with conditions in order to skew the behavior.

///// ANY CHANGE IN THE DATABASE STRUCTURE MUST BE REFLECTED IN REDUX ACTIONS AAAAND HASCHILDREN FUNCTION.

function SubItemLevel({
  subItem,
  handleOpenLevel,
  openedSubItems = {},
  handleNewSubItem,
  handleModifySubItem,
  handleDeleteSubItem,
  level,
  isMaxLevel,
}) {
  const childrenList = hasChildren(subItem);
  //  console.log(openedSubItems);
  if (level < 4) level++;
  isMaxLevel = level < 4;
  let inputSize = 1 - (0.8 * Math.log(level)) / 5 + "rem";
  return (
    <>
      <SubItemsContainer>
        {Object.keys(childrenList)
          .sort((a, b) => {
            return childrenList[b].orderCount - childrenList[a].orderCount;
          })
          .map((key) => {
            const isSubOpened =
              openedSubItems[key] !== undefined &&
              openedSubItems[key] !== false;

            return (
              <div key={key}>
                <ListItem styleLevel={level}>
                  <div style={{ width: "100%" }}>
                    <TextDisplay
                      text={childrenList[key].title}
                      fontSize={inputSize}
                      getNewValue={handleModifySubItem}
                      todoId={key}
                      checkErrors={() => {}}
                    />
                  </div>
                  <ButtonWrap display={"flex-start"} mobileDisplay={"flex-end"}>
                    <>
                      {(isSubOpened || !childrenList[key].hasChildren) &&
                      isMaxLevel ? (
                        <ButtonWrap>
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
                          <ButtonWrap>
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
                            <ButtonWrap>
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
                      <ButtonWrap>
                        <DeleteSubLevel
                          onClick={() =>
                            handleDeleteSubItem(key, level, childrenList)
                          }
                        />
                      </ButtonWrap>
                    </>
                  </ButtonWrap>
                </ListItem>
                {isSubOpened && isMaxLevel ? (
                  <>
                    <SubItemLevel
                      subItem={subItem[key]}
                      handleOpenLevel={handleOpenLevel}
                      openedSubItems={openedSubItems}
                      handleNewSubItem={handleNewSubItem}
                      handleModifySubItem={handleModifySubItem}
                      handleDeleteSubItem={handleDeleteSubItem}
                      level={level}
                      isMaxLevel={isMaxLevel}
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

SubItemLevel.propTypes = {
  subItem: PropTypes.object.isRequired,
  handleOpenLevel: PropTypes.func.isRequired,
  openedSubItems: PropTypes.object.isRequired,
  handleNewSubItem: PropTypes.func.isRequired,
  handleModifySubItem: PropTypes.func.isRequired,
  handleDeleteSubItem: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
};

export default SubItemLevel;
