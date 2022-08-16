import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {userService} from "../../services";


export const getProfile = createAsyncThunk(
    "profile/get",
    async (id: string, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUser(id)
            return data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })


//follow
export const followPerson = createAsyncThunk(
    "profile/follow", async (userToFollowId: string, {rejectWithValue, getState}) => {
        try {
            await userService.follow(userToFollowId)
            const appState = getState() as RootState
            return appState.auth.user.userInfo.id
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })
//unFollow
export const unFollowPerson = createAsyncThunk("profile/unfollow", async (userToUnfollowId: string, {
    rejectWithValue,
    getState
}) => {
    try {
        await userService.unFollow(userToUnfollowId)
        const appState = getState() as RootState
        return appState.auth.user.userInfo.id
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
//accepFriend
export const acceptFriend = createAsyncThunk("profile/acceptFriend", async (userToAcceptId: string, {
    rejectWithValue,
    getState
}) => {
    try {
        await userService.acceptFriendship(userToAcceptId)
        const appState = getState() as RootState
        return appState.auth.user.userInfo.id
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
//rejectFriend
export const rejectFriend = createAsyncThunk("profile/rejectFriend", async (userToRejectId: string, {
    rejectWithValue,
    getState
}) => {
    try {
        await userService.rejectFriendship(userToRejectId)
        const appState = getState() as RootState
        return appState.auth.user.userInfo.id
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

//cancel follow request
export const cancelFollow = createAsyncThunk("profile/cancelFollow", async (receiverId: string, {
    rejectWithValue,
    getState
}) => {
    try {
        await userService.cancelFollowRequest(receiverId)
        const appState = getState() as RootState
        return appState.auth.user.userInfo.id
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})