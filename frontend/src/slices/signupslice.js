// signup data
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signupData : null,
}

const signupslice = createSlice({
    name : "signup",
    initialState : initialState,
    reducers : {
        setSignupData(state,value) {
            state.signupData = value.payload;
        }
    }
});

export const {setSignupData} = signupslice.actions;
export default signupslice.reducer;