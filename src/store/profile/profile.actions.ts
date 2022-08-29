import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import {IUser} from "../../models";
import {UpdateUserModel} from "../../models/user.model";


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

export const updateUser = createAsyncThunk("profile/update", async (updatedData : UpdateUserModel,thunkApi) =>{
    try {
        console.log(updatedData)
        const { data } = await userService.updateUser(updatedData);
        return data
    }catch (err: any){
        return thunkApi.rejectWithValue(err.response.data)
    }
})


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

interface IRejectFriendParams {
    userToRejectId : string,
    myId : string
}
export const rejectFriend = createAsyncThunk("profile/rejectFriend", async (params : IRejectFriendParams, {rejectWithValue}) => {
    try {
        await userService.rejectFriendship(params.userToRejectId)
        return params.myId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})


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