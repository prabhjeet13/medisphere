import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from '../slices/signupslice';
import profileReducer from '../slices/profileSlice';
import editReducer from '../slices/editSlice';
const rootReducer = combineReducers({
    signup : signupReducer,
    profile : profileReducer,
    edit : editReducer,
});

export default rootReducer;