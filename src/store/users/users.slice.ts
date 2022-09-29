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
import {isFullfilledAction, isPendingAction, isRejectedAction} from "../index";


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
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload
            })
            .addCase(unFollowFriend.fulfilled, (state, action: PayloadAction<{
                userToUnfollowId : string,
                myId : string
            }>) => {
                if (!state.users) return;
                const currentUser = state.users.find(u => u._id === action.payload.userToUnfollowId)
                if (currentUser) {
                    currentUser.followers = (currentUser.followers as string[]).filter( id => id !== action.payload.myId)
                }
                // state.users = state.users!.filter(user => user._id !== action.payload);
            })
            .addCase(followPerson.fulfilled, (state, action: PayloadAction<{
                myId : string,
                personToFollowId : string
            }>) => {
                if (!state.users) return;
                const currentUser = state.users.find(u => u._id === action.payload.personToFollowId)
                if (currentUser) {
                    (currentUser.followersRequests as string[]).push(action.payload.myId)
                }
                // state.users = state.users!.filter(user => user._id !== action.payload._id)
            })
            .addCase(acceptFriendship.fulfilled, (state, action: PayloadAction<{
                userToAcceptId : string,
                myId : string
            }>) => {
                if (!state.users) return;
                const currentUser = state.users.find(u => u._id === action.payload.userToAcceptId)
                if (currentUser) {
                    currentUser.followingRequests = (currentUser.followingRequests as string[]).filter( id => id !== action.payload.myId);
                    (currentUser.followers as string[]).push(action.payload.myId)
                }
                // state.users = state.users!.filter( person => person._id !== action.payload._id);
            })
            .addCase(rejectFriendship.fulfilled, (state, action: PayloadAction<{
                myId : string,
                userToRejectId : string
            }>) => {
                if (!state.users) return;
                const currentUser = state.users.find(u => u._id === action.payload.userToRejectId)
                if (currentUser) {
                    currentUser.followingRequests = (currentUser.followingRequests as string[]).filter( id => id !== action.payload.myId);
                }
                // state.users = state.users!.filter( person => person._id !== action.payload);
            })
            .addCase(cancelFollow.fulfilled, (state, action: PayloadAction<{
                userToCancelId: string, myId : string
            }>) => {
                if (!state.users) return;
                const currentUser = state.users.find(u => u._id === action.payload.userToCancelId)
                if (currentUser) {
                    currentUser.followersRequests = (currentUser.followersRequests as string[]).filter( id => id !== action.payload.myId)
                }
                // state.users = state.users!.filter(person => person._id !== action.payload);
            })


            .addMatcher(isPendingAction, (state, action) => {
                state.fetching = true
            })
            .addMatcher(isRejectedAction, (state, action: PayloadAction<any>) => {
                state.fetching = true
                state.error = action.payload
            })
            .addMatcher(isFullfilledAction, (state, action: PayloadAction<any>) => {
                state.fetching = false
            })
})

export default usersSlice.reducer;
