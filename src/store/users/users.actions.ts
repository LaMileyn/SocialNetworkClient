import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import {IUser} from "../../models";


interface IGetAllParams {
    search : string,
    isFriends : boolean
}
export const getUsers = createAsyncThunk("friends/get", async (params : { search : string,isFriend : boolean, id :string }, {rejectWithValue}) => {
    try {
        const {data} = await userService.allUsers(params.search, params.isFriend,params.id)
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})

export const getCurrentUser = createAsyncThunk("users/currentUser", async (id: string, {rejectWithValue}) => {
    try {
        const {data} = await userService.getUser(id)
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const unFollowFriend = createAsyncThunk("users/unfollowFriend", async (params : { userToUnfollowId: string, myId : string}, {
    rejectWithValue
}) => {
    try {
        await userService.unFollow(params.userToUnfollowId)
        return {
            userToUnfollowId : params.userToUnfollowId,
            myId : params.myId
        };
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const cancelFollow = createAsyncThunk(
    "users/cancelFollow",
    async (params : { userToCancelId: string, myId : string }, {rejectWithValue}) => {
        try {
            await userService.cancelFollowRequest(params.userToCancelId)
            return {
                userToCancelId : params.userToCancelId,
                myId : params.myId
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const followPerson = createAsyncThunk(
    "users/followPerson",
    async ( params : {personToFollow: IUser, myId : string}, {rejectWithValue}) => {
        try {
            await userService.follow(params.personToFollow._id)
            return {
                myId : params.myId,
                personToFollowId : params.personToFollow._id
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const acceptFriendship = createAsyncThunk("users/acceptFriend", async (params : {userToAccept: IUser, myId : string} , {
    rejectWithValue
}) => {
    try {
        await userService.acceptFriendship(params.userToAccept._id)
        return{
            userToAccept : params.userToAccept,
            myId : params.myId
        }
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const rejectFriendship = createAsyncThunk("users/rejectFriend", async (params : { userToRejectId: string, myId : string}, {
    rejectWithValue
}) => {
    try {
        await userService.rejectFriendship(params.userToRejectId)
        return {
            myId : params.myId,
            userToRejectId : params.userToRejectId
        }
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
