import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost, IUser, ServerError} from "../../models";
import {
    acceptFriend,
    cancelFollow,
    followPerson,
    getProfile,
    rejectFriend,
    unFollowPerson,
    updateUser
} from "./profile.actions";
import {createNewPost, deletePost} from "../posts/posts.actions";
import {isPendingAction, isRejectedAction} from "../index";


interface SliceState {
    profile: IUser | null,
    fetching: boolean,
    error: ServerError | null
}

const initialState: SliceState = {
    profile: null,
    fetching: false,
    error: null
}


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.fetching = false
                state.profile = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.profile = action.payload
            })
            .addCase(createNewPost.fulfilled, (state, action: PayloadAction<IPost>) => {
                if (!state.profile) return;
                (state.profile.posts as string[]).push(action.payload._id)
            })
            .addCase(followPerson.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false;
                (state.profile!.followersRequests as Array<string>).push(action.payload)
            })
            .addCase(unFollowPerson.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                state.profile!.followers = (state.profile!.followers as Array<string>).filter(id => id !== action.payload);
            })
            .addCase(acceptFriend.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                if (state.profile) {
                    (state.profile.followers as Array<string>).push(action.payload);
                    state.profile.followingRequests = (state.profile.followingRequests as Array<string>).filter(id => id !== action.payload)
                }
            })
            .addCase(rejectFriend.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                if (state.profile) {
                    state.profile.followingRequests = (state.profile.followingRequests as Array<string>).filter(id => id !== action.payload)
                }
            })
            .addCase(cancelFollow.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                if (state.profile) {
                    state.profile.followersRequests = (state.profile.followersRequests as Array<string>).filter(id => id !== action.payload)
                }
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
                if (!state.profile) return;
                state.profile.posts = (state.profile.posts as string[]).filter(el => el !== action.payload)
            })
            .addMatcher(isPendingAction, (state, action) => {
                state.fetching = true
            })
            .addMatcher(isRejectedAction, (state, action : PayloadAction<any>) => {
                state.fetching = true
                state.error = action.payload
            })


})
export const {} = profileSlice.actions;
export default profileSlice.reducer;
