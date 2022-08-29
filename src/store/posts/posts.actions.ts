import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostCreateModel} from "../../models";
import postService from "../../services/post-service";


export const getPosts = createAsyncThunk("posts/get", async (id : string | undefined, thunkApi) =>{
    try {
        const { data } = id
            ? await postService.getUserPosts(id)
            : await postService.getTimeLine()
        return data
    }catch (err : any){
        return thunkApi.rejectWithValue(err.response.data)
    }
})

export const createNewPost = createAsyncThunk("posts/create", async (newPost : PostCreateModel,thunkApi) =>{
    try {
        const { data } = await postService.createPost(newPost);
        return data
    }catch (err : any){
        return thunkApi.rejectWithValue(err.response.data)
    }
})

export const likePost = createAsyncThunk("posts/like", async (params : { postId : string, userId : string, liked : boolean },thunkApi) =>{
    try {
        const { data } = await postService.likePost(params.postId,params.userId)
        return params
    }catch (err : any){
        return thunkApi.rejectWithValue(err.response.data)
    }
})