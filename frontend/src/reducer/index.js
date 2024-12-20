import { combineReducers } from "@reduxjs/toolkit";
import signupReducer from '../slices/signupslice';
import profileReducer from '../slices/profileSlice';

const rootReducer = combineReducers({
    signup : signupReducer,
    profile : profileReducer,
});

export default rootReducer;