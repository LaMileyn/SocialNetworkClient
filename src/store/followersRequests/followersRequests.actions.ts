import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from "../../services";
import {IUser} from "../../models";


export const getFollowersRequests = createAsyncThunk("friends/getFollowers", async (_, {rejectWithValue}) => {
    try {
        const {data} = await userService.userFollowersRequests()
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})


export const acceptFriendship = createAsyncThunk("friends/acceptFriend", async (userToAccept: IUser, {
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
export const rejectFriendship = createAsyncThunk("friends/rejectFriend", async (userToRejectId: string, {
    rejectWithValue
}) => {
    try {
        await userService.rejectFriendship(userToRejectId)
        return userToRejectId
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
