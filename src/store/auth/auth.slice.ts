import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ServerError, UserDto} from "../../models";
import {checkAuth, loginMe, registerMe} from "./auth.actions";

interface SliceState {
    user: UserDto | null,
    fetching: boolean,
    error: ServerError | null
}

const initialState : SliceState = {
    user: null,
    fetching: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            // login
            .addCase(loginMe.pending, (state) => {
                state.fetching = true
            })
            .addCase(loginMe.fulfilled, (state, action: PayloadAction<UserDto>) => {
                state.fetching = false
                state.user = action.payload;
            })
            .addCase(loginMe.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload;
            })
            // registration
            .addCase(registerMe.pending, (state) => {
                state.fetching = true
            })
            .addCase(registerMe.fulfilled, (state, action: PayloadAction<UserDto>) => {
                state.fetching = false
                state.user = action.payload;
            })
            .addCase(registerMe.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload;
            })
            // check auth
            .addCase(checkAuth.pending, (state) => {
                state.fetching = true
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserDto>) => {
                state.fetching = false
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload;
                state.user = null
                localStorage.removeItem("token")
            })
})

export const {} = authSlice.actions;
export default authSlice.reducer;

