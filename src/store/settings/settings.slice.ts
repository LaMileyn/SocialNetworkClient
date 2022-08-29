import {IUser, ServerError} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCurrentUser} from "./settings.actions";

interface StateSlice{
    currentUser : IUser | null,
    fetching : boolean,
    error : ServerError | any
}

const initialState : StateSlice = {
    currentUser : null,
    fetching: false,
    error: null
}
const settingsSlice = createSlice({
    name : "settings",
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.fetching = true
            })
            .addCase(getCurrentUser.fulfilled, (state, action : PayloadAction<IUser>) => {
                state.fetching = false
                state.currentUser = action.payload
            })
            .addCase(getCurrentUser.rejected, (state , action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
    }

})

export const {} = settingsSlice.actions;
export default settingsSlice.reducer;