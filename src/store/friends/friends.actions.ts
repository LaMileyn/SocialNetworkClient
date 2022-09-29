import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";

export const getCurrentUser = createAsyncThunk(
    "friends/currentUser",
    async (id : string,{rejectWithValue}) =>{
    try {
        const {data} = await userService.getUser(id)
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})
export const getFollowersRequests = createAsyncThunk("friends/getFollowersRequests", async (_, {rejectWithValue}) => {
    try {
        const {data} = await userService.userFollowersRequests()
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})