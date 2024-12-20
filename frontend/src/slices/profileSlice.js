// token , after login user ka data
// signup data
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData : localStorage.getItem('userData') || null,
    token : localStorage.getItem('token') || null,
}

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setUserData(state,value) {
            state.userData = value.payload;
        },
        setToken(state,value) {
            state.token = value.payload;
        }
    }
});

export const {setUserData, Token} = signupslice.actions;
export default profileSlice.reducer;