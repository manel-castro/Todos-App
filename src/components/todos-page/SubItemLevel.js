import React from "react";
import PropTypes from "prop-types";
import { hasChildren } from "../_helpers/subItemsHelpers";

// this is a recursive component, with conditions in order to skew the behavior.

function SubItemLevel({
  subItem,
  handleOpenLevel,
  openedSubItems = {},
  handleNewSubItem,
}) {
  const childrenList = hasChildren(subItem);
  console.log(openedSubItems);
  return (
    <>
      {Object.keys(childrenList).map((key) => {
        const isSubOpened =
          openedSubItems[key] !== undefined && openedSubItems[key] !== false;

        return (
          <>
            <>add</>
            <li style={{ marginLeft: "10px" }} key={key}>
              <>{childrenList[key].title}</>
              <>
                {childrenList[key].hasChildren ? (
                  !isSubOpened ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenLevel(key, true);
                      }}
                    >
                      Expand
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenLevel(key, false);
                        }}
                      >
                        Contract
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleNewSubItem();
                        }}
                      >
                        Add
                      </button>
                    </>
                  )
                ) : null}
              </>
              {isSubOpened ? (
                <>
                  {console.log("rendered child")}
                  <ul>
                    <SubItemLevel
                      subItem={subItem[key]}
                      handleOpenLevel={handleOpenLevel}
                      openedSubItems={openedSubItems}
                    />
                  </ul>
                </>
              ) : null}
            </li>
            <>Add</>
          </>
        );
      })}
    </>
  );
}

SubItemLevel.defaultProps = {};

SubItemLevel.propTypes = {};

export default SubItemLevel;
