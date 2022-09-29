import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import {IUser} from "../../models";


interface IGetAllParams {
    search : string,
    isFriends : boolean
}
export const getUsers = createAsyncThunk("friends/get", async (params : { search : string,isFriend : boolean }, {rejectWithValue}) => {
    try {
        const {data} = await userService.allUsers(params.search, params.isFriend)
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})


// friends actions
export const getCurrentUser = createAsyncThunk("users/currentUser", async (id: string, {rejectWithValue}) => {
    try {
        const {data} = await userService.getUser(id)
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

// export const getFriends = createAsyncThunk("users/get", async (id: string, {rejectWithValue}) => {
//     try {
//         const {data} = await userService.getFriends(id)
//         return data
//     } catch (err: any) {
//         return rejectWithValue(err.response.data)
//     }
// })

export const unFollowFriend = createAsyncThunk("users/unfollowFriend", async (userToUnfollowId: string, {
    rejectWithValue
}) => {
    try {
        await userService.unFollow(userToUnfollowId)
        return userToUnfollowId;
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
// friends actions

// following actions
// export const getFollowingRequests = createAsyncThunk(
//     "users/getRequestsFollowing",
//     async (_, {rejectWithValue}) => {
//         try {
//             const {data} = await userService.userFollowingRequests()
//             return data
//         } catch (err: any) {
//             return rejectWithValue(err.response.data)
//         }
//     })

export const cancelFollow = createAsyncThunk(
    "users/cancelFollow",
    async (id: string, {rejectWithValue}) => {
        try {
            await userService.cancelFollowRequest(id)
            return id
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const followPerson = createAsyncThunk(
    "users/followPerson",
    async (person: IUser, {rejectWithValue}) => {
        try {
            await userService.follow(person._id)
            return person
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const acceptFriendship = createAsyncThunk("users/acceptFriend", async (userToAccept: IUser, {
    rejectWithValue
}) => {
    try {
        await userService.acceptFriendship(userToAccept._id)
        return userToAccept
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
//rejectFriend
export const rejectFriendship = createAsyncThunk("users/rejectFriend", async (userToRejectId: string, {
    rejectWithValue
}) => {
    try {
        await userService.rejectFriendship(userToRejectId)
        return userToRejectId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
