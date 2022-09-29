import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    unFollowFriend,
    followPerson,
    acceptFriendship,
    rejectFriendship,
    cancelFollow,
    getUsers
} from "./users.actions"
import {IUser, ServerError} from "../../models";


interface SliceState {
    users: IUser[] | null,
    fetching: boolean,
    error: null | ServerError
}

const initialState: SliceState = {
    users: null,
    fetching: false,
    error: null
}

const usersSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getUsers.pending, (state) => {
                state.fetching = true
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.fetching = false;
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false;
                state.error = action.payload
            })
            // unFollow
            .addCase(unFollowFriend.pending, (state) => {
                state.fetching = true
            })
            .addCase(unFollowFriend.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                state.users = state.users!.filter(user => user._id !== action.payload);
            })
            .addCase(unFollowFriend.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // followPerson
            .addCase(followPerson.pending, (state) => {
                state.fetching = true
            })
            .addCase(followPerson.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.fetching = false
                state.users = state.users!.filter(user => user._id !== action.payload._id)
            })
            .addCase(followPerson.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // accept
            .addCase(acceptFriendship.pending, (state) => {
                state.fetching = true
            })
            .addCase(acceptFriendship.fulfilled, (state, action : PayloadAction<IUser>) => {
                state.fetching = false
                state.users = state.users!.filter( person => person._id !== action.payload._id);
            })
            .addCase(acceptFriendship.rejected, (state, action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // reject
            .addCase(rejectFriendship.pending, (state) => {
                state.fetching = true
            })
            .addCase(rejectFriendship.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false
                state.users = state.users!.filter( person => person._id !== action.payload);
            })
            .addCase(rejectFriendship.rejected, (state, action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // cancelFollow
            .addCase(cancelFollow.pending, (state) => {
                state.fetching = true
            })
            .addCase(cancelFollow.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                state.users = state.users!.filter(person => person._id !== action.payload);
            })
            .addCase(cancelFollow.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
})

export default usersSlice.reducer;
