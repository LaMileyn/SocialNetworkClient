import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewPost, getPosts} from "./posts.actions";
import {IPost, ServerError} from "../../models";

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
            // get posts
            .addCase(getPosts.pending, (state) =>{
                state.fetching = true
            })
            .addCase(getPosts.fulfilled, (state, action :PayloadAction<IPost[]>) =>{
                state.fetching = false
                state.posts = action.payload.filter( el => el)
            })
            .addCase(getPosts.rejected, (state,action : PayloadAction<any>) =>{
                state.fetching = false
                state.error = action.payload
            })
            // create post
            .addCase(createNewPost.pending, (state) =>{
                state.fetching = true
            })
            .addCase(createNewPost.fulfilled, (state, action :PayloadAction<IPost>) =>{
                state.fetching = false
                state.posts = [action.payload,...state.posts]
            })
            .addCase(createNewPost.rejected, (state,action : PayloadAction<any>) =>{
                state.fetching = false
                state.error = action.payload
            })
})

export const {} = postsSlice.actions;
export default postsSlice.reducer;