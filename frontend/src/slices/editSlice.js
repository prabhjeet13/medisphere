// for editing the data
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    editPermit : false,
    editData :  localStorage.getItem('editData')  ? JSON.parse(localStorage.getItem('editData')) : null
}

const editSlice = createSlice({
    name : "edit",
    initialState : initialState,
    reducers : {
        seteditPermit(state,value) {
            state.editPermit = value.payload;
        },
        seteditData(state,value) {
            state.editData = value.payload;
        },
    }
});

export const {seteditData,seteditPermit} = editSlice.actions;
export default editSlice.reducer;