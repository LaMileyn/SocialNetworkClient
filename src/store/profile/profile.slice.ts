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


interface SliceState {
    profile: IUser | null,
    fetching: boolean,
    error: ServerError | null
}

const initialState : SliceState = {
    profile : null,
    fetching : false,
    error : null
}


const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers : {},
    extraReducers : (builder) =>
        builder
            // get profile
            .addCase(getProfile.pending, (state) =>{
                state.fetching = true
            })
            .addCase(getProfile.fulfilled, (state,action : PayloadAction<IUser>) =>{
                state.fetching = false
                state.profile = action.payload
            })
            .addCase(getProfile.rejected, (state,action : PayloadAction<any>) =>{
                state.fetching = false
                state.error = action.payload
            })
            // update profile
            .addCase(updateUser.fulfilled, (state,action : PayloadAction<IUser>) =>{
                state.profile = action.payload
            })
            .addCase(createNewPost.fulfilled, (state,action : PayloadAction<IPost>) =>{
                if (!state.profile) return;
                (state.profile.posts as string[]).push(action.payload._id)
            })
            // follow person
            .addCase(followPerson.pending, (state) => {
                state.fetching = true
            })
            .addCase(followPerson.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false;
                ( state.profile!.followersRequests as Array<string> ).push(action.payload)
            })
            .addCase(followPerson.rejected, (state) => {
                state.fetching = false
            })
            // unfollow person
            .addCase(unFollowPerson.pending, (state) => {
                state.fetching = true
            })
            .addCase(unFollowPerson.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false
                state.profile!.followers =  (state.profile!.followers as Array<string>).filter( id => id !== action.payload);
            })
            .addCase(unFollowPerson.rejected, (state) => {
                state.fetching = false
            })
            // accept person

            .addCase(acceptFriend.pending, (state) => {
                state.fetching = true
            })
            .addCase(acceptFriend.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false
                if (state.profile){
                    (state.profile.followers as Array<string>).push(action.payload);
                    state.profile.followingRequests = (state.profile.followingRequests as Array<string>).filter( id => id !== action.payload)
                }
            })
            .addCase(acceptFriend.rejected, (state) => {
                state.fetching = false
            })


            // reject person
            .addCase(rejectFriend.pending, (state) => {
                state.fetching = true
            })
            .addCase(rejectFriend.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false
                if (state.profile){
                    state.profile.followingRequests = (state.profile.followingRequests as Array<string>).filter( id => id !== action.payload)
                }
            })
            .addCase(rejectFriend.rejected, (state) => {
                state.fetching = false
            })


            //cancel follow requests
            .addCase(cancelFollow.pending, (state) => {
                state.fetching = true
            })
            .addCase(cancelFollow.fulfilled, (state, action : PayloadAction<string>) => {
                state.fetching = false
                if (state.profile){
                    state.profile.followersRequests = (state.profile.followersRequests as Array<string>).filter( id => id !== action.payload)
                }
            })
            .addCase(cancelFollow.rejected, (state) => {
                state.fetching = false
            })

            // post delete
            .addCase(deletePost.fulfilled, (state, action : PayloadAction<string>) =>{
                if (!state.profile) return;
                state.profile.posts = ( state.profile.posts as string[] ).filter( el => el !== action.payload )
            })


})
export const {} = profileSlice.actions;
export default profileSlice.reducer;
