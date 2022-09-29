import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models";
import {getCurrentUser, getFollowersRequests, getFollowingRequests} from "./friends.actions";
import {isFullfilledAction, isPendingAction, isRejectedAction, RootState} from "../index";


type FriendsState = {
    currentUser : IUser | null,
    followersRequests : IUser[],
    followingRequests : IUser[],
    fetching : boolean,
    error : any

}

const initialState = {
    currentUser : null,
    followersRequests : [],
    followingRequests : [],
    fetching : false,
    error : null
} as FriendsState

const friendsSlice = createSlice({

    name : "friends",
    initialState,
    reducers : {},
    extraReducers : builder =>
        builder
            .addCase(getCurrentUser.fulfilled, (state,action : PayloadAction<IUser>) =>{
                state.currentUser = action.payload
                state.fetching = false
            })
            .addCase(getFollowersRequests.fulfilled, (state,action : PayloadAction<IUser[]>) =>{
                state.followersRequests = action.payload
            })
            .addCase(getFollowingRequests.fulfilled, (state,action : PayloadAction<IUser[]>) =>{
                state.followingRequests = action.payload
            })
            // matchers
            .addMatcher(isPendingAction, (state, action) => {
                state.fetching = true
            })
            .addMatcher(isRejectedAction, (state, action : PayloadAction<any>) => {
                state.fetching = true
                state.error = action.payload
            })
            .addMatcher(isFullfilledAction, (state, action : PayloadAction<any>) => {
                state.fetching = false
            })
})

export const {} = friendsSlice.actions;
export default friendsSlice.reducer;