import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from "../../services";

export const getAllUsers = createAsyncThunk(
    "users/usersAll/get",
    async (search: string, {rejectWithValue}) => {
        try {
            const {data} = await userService.allUsers(search)
            return data
        } catch (err : any) {
            return rejectWithValue(err.response.data)
        }
    })

