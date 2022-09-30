import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models";
import {getCurrentUser, getFollowersRequests, getFollowingRequests} from "./friends.actions";
import {isFullfilledAction, isPendingAction, isRejectedAction, RootState} from "../index";
import {acceptFriendship, cancelFollow, rejectFriendship} from "../users/users.actions";


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
            .addCase(acceptFriendship.fulfilled, (state,action : PayloadAction<{
                userToAccept : IUser,
                myId : string
            }>) =>{
                if (state.followersRequests.length === 0) return;
                state.followersRequests = state.followersRequests.filter( user => user._id !== action.payload.userToAccept._id)
            })
            .addCase(rejectFriendship.fulfilled, (state,action : PayloadAction<{
                myId : string,
                userToRejectId : string
            }>) =>{
                if (state.followersRequests.length === 0) return;
                state.followersRequests = state.followersRequests.filter( user => user._id !== action.payload.myId)
            })
            .addCase(cancelFollow.fulfilled, (state, action: PayloadAction<{
                userToCancelId: string, myId : string
            }>) => {
                if (state.followingRequests.length === 0) return
                state.followingRequests = state.followingRequests.filter( user => user._id !== action.payload.userToCancelId)
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