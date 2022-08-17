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
interface IFollowParams {
    userToFollowId : string,
    myId : string
}
export const followPerson = createAsyncThunk(
    "profile/follow", async ( params : IFollowParams, {rejectWithValue}) => {
        try {
            await userService.follow(params.userToFollowId)
            return params.myId
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })
//unFollow
interface IUnFollowParams {
    userToUnfollowId : string,
    myId : string
}
export const unFollowPerson = createAsyncThunk("profile/unfollow", async (params : IUnFollowParams, {rejectWithValue}) => {
    try {
        await userService.unFollow(params.userToUnfollowId)
        return params.myId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
//accepFriend
interface IAcceptFriendParams {
    userToAcceptId : string,
    myId : string
}
export const acceptFriend = createAsyncThunk("profile/acceptFriend", async (params : IAcceptFriendParams, {rejectWithValue}) => {
    try {
        await userService.acceptFriendship(params.userToAcceptId)
        return params.myId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
//rejectFriend
interface IAcceptFriendParams {
    userToRejectId : string,
    myId : string
}
export const rejectFriend = createAsyncThunk("profile/rejectFriend", async (params : IAcceptFriendParams, {rejectWithValue}) => {
    try {
        await userService.rejectFriendship(params.userToRejectId)
        return params.myId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

//cancel follow request
interface ICancelFollowParams {
    receiverId : string,
    myId : string
}
export const cancelFollow = createAsyncThunk("profile/cancelFollow", async (params: ICancelFollowParams, {rejectWithValue}) => {
    try {
        await userService.cancelFollowRequest(params.receiverId)
        return params.myId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})