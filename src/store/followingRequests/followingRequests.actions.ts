import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../../services/user-service";
import {IUser} from "../../models";


export const getFollowingRequests = createAsyncThunk(
    "friends/getRequestsFollowing",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.userFollowingRequests()
            return data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const cancelFollow = createAsyncThunk(
    "friends/cancelFollow",
    async (id: string, {rejectWithValue}) => {
        try {
            await userService.cancelFollowRequest(id)
            return id
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })

export const followPerson = createAsyncThunk(
    "friends/followPerson",
    async (person: IUser, {rejectWithValue}) => {
        try {
            await userService.follow(person._id)
            return person
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    })
// following requests

