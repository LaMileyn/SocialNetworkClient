import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewPost, deletePost, getPosts, likePost} from "./posts.actions";
import {IPost, ServerError} from "../../models";
import {isPendingAction, isRejectedAction} from "../index";

interface SliceState {
    posts : IPost[],
    fetching : boolean,
    error : ServerError | null
}

const initialState : SliceState = {
    posts : [],
    fetching : false,
    error : null
}
const postsSlice = createSlice({
    name : "posts",
    initialState,
    reducers : {},
    extraReducers : builder =>
        builder
            .addCase(getPosts.fulfilled, (state, action :PayloadAction<IPost[]>) =>{
                state.fetching = false
                state.posts = action.payload.filter( el => el)
            })
            .addCase(createNewPost.fulfilled, (state, action :PayloadAction<IPost>) =>{
                state.fetching = false
                state.posts = [action.payload,...state.posts]
            })
            .addCase(likePost.fulfilled, (state,action : PayloadAction<{ postId : string, userId : string, liked : boolean }>) =>{
                const currPost = state.posts.find( post => post._id === action.payload.postId);
                if (!currPost) return;
                action.payload.liked
                    ? currPost.likes = (currPost.likes as string[]).filter( el => el !== action.payload.userId)
                    : (currPost.likes as string[]).push(action.payload.userId)
            })
            .addCase(deletePost.fulfilled, (state, action : PayloadAction<string>) =>{
                state.posts = state.posts.filter( post => post._id !== action.payload)
            })
            .addMatcher(isPendingAction, (state, action) => {
                state.fetching = true
            })
            .addMatcher(isRejectedAction, (state, action : PayloadAction<any>) => {
                state.fetching = true
                state.error = action.payload
            })
})

export const {} = postsSlice.actions;
export default postsSlice.reducer;