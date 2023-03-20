import { createSlice } from "@reduxjs/toolkit";


export const itemsObjSlice = createSlice({
    name: 'itemsObj',
    initialState: {
        itemsObj: [],
    },
    reducers: {
        setItemsObj: (state, action) => {
            state.itemsObj = action.payload;
            console.log("redux",action.payload);
        },
        appendingColumn: (state, action) => {
            const {startColumnPageNo, dropColumnPageNo, newdropColumnCopyList} = action.payload;
            const newObj = { ...state.itemsObj };
            newObj[startColumnPageNo] = [{title:"Add More"}];
            newObj[dropColumnPageNo] = newdropColumnCopyList;
            state.itemsObj = newObj;
        },
        appendingSingleItemSameList: (state, action) => {
            const {pageNo, copyList} = action.payload;
            const newObj = { ...state.itemsObj };
            newObj[pageNo] = copyList;
            state.itemsObj = newObj;
        },
        appendingSingleItemDifferentList : (state, action) => {
            const {startPageNo, dropPageNo, startCopyList, dropCopyList} = action.payload;
            const newObj = { ...state.itemsObj };
            newObj[startPageNo] = startCopyList;
            newObj[dropPageNo] = dropCopyList;
            state.itemsObj = newObj;
        }
    }
})

export const {appendingColumn, appendingSingleItemSameList, appendingSingleItemDifferentList, setItemsObj} = itemsObjSlice.actions;
export default itemsObjSlice.reducer;