import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";


export const getCurrentUser = createAsyncThunk("friends/currentUser", async (id: string, {rejectWithValue}) => {
    try {
        const {data} = await userService.getUser(id)
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const getFriends = createAsyncThunk("friends/get", async (id: string, {rejectWithValue}) => {
    try {
        const {data} = await userService.getFriends(id)
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const unFollowFriend = createAsyncThunk("friends/unfollowFriend", async (userToUnfollowId: string, {
    rejectWithValue
}) => {
    try {
        await userService.unFollow(userToUnfollowId)
        return userToUnfollowId;
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

