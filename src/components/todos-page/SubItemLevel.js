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
}) {
  const childrenList = hasChildren(subItem);
  //  console.log(openedSubItems);
  if (level < 5) level++;
  console.log("LEVEL IS: ", level);
  let inputSize = 1 - (0.8 * Math.log(level)) / 5 + "rem";
  console.log("INPUTSIZE: ", inputSize);
  return (
    <>
      <SubItemsContainer>
        {Object.keys(childrenList)
          .sort((a, b) => {
            console.log("SORT", a);
            console.log(`OrderCount in ${a}`);
            console.log(childrenList[a]);
            return childrenList[b].orderCount - childrenList[a].orderCount;
          })
          .map((key) => {
            console.log("CHILDREN LIST: ", childrenList);
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
                      {isSubOpened || !childrenList[key].hasChildren ? (
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
                          style={{ fontSize: 20, marginLeft: "7px" }}
                          onClick={() =>
                            handleDeleteSubItem(key, level, childrenList)
                          }
                        />
                      </ButtonWrap>
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
                      handleDeleteSubItem={handleDeleteSubItem}
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