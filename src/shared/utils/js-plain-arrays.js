//plain arrays of objects


export const moveItemWithinArray = (arr, item, newIndex) => {
    const arrClone = [...arr];
    const oldIndex = arrClone.indexOf(item);
    arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
    return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
    const arrClone = [...arr];
    arrClone.splice(index, 0, item);
    return arrClone;
};

export const updateArrayItemById = (arr, itemId, fields) => {
    const arrClone = [...arr];
    const item = arrClone.find(({ id }) => id === itemId);
    if (item) {
        const itemIndex = arrClone.indexOf(item);
        arrClone.splice(itemIndex, 1, { ...item, ...fields });
    }
    return arrClone;
};

export const deleteArrayItemById = (arr, itemId) => {
    const arrClone = [...arr];
    const item = arrClone.find(({ id }) => id === itemId)
    if (item) {
        const itemIndex = arrClone.indexOf(item);
        arrClone.splice(itemIndex, 1)
    }
    return arrClone
}

export const sortByNewest = (items, sortField) =>
    items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));




///Testing. 
const mockArray = [{ id: 11 }, { id: 2 }, { id: 32 }, { id: 24 }]


console.log(moveItemWithinArray(mockArray, mockArray[0], 2));
