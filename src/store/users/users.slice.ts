import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllUsers} from "./users.actions"
import {followPerson} from "../followingRequests/followingRequests.actions";
import {IUser, ServerError} from "../../models";


interface SliceState {
    users : IUser<string>[] | null,
    fetching : boolean,
    error : null | ServerError
}

const initialState : SliceState = {
    users : null,
    fetching : false,
    error : null
}

const usersSlice = createSlice({
    name : "friends",
    initialState,
    reducers : {},
    extraReducers : (builder) =>
        builder
            .addCase(getAllUsers.pending, (state) =>{
                state.fetching = true
            })
            .addCase(getAllUsers.fulfilled, (state,action : PayloadAction<IUser<string>[]>) => {
                state.fetching = false;
                state.users = action.payload
            })
})

export default usersSlice.reducer;
