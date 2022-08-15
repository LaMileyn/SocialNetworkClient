import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserAuthorizationModel, UserDto, UserRegistrationModel} from "../../models/user.model";
import UserService from "../../services/user-service";
import axios from "axios";

export const loginMe = createAsyncThunk("auth/login",
    async (user : UserAuthorizationModel, {rejectWithValue}) => {
        try {
            const {data} = await UserService.login(user)
            localStorage.setItem("token", data.accessToken)
            return data
        } catch (err : any) {
            return rejectWithValue(err.response.data)
        }
    })

export const registerMe = createAsyncThunk("auth/register",
    async (user : UserRegistrationModel, {dispatch,rejectWithValue}) => {
        try {
            const {data} = await UserService.register(user)
            localStorage.setItem("token", data.accessToken)
            return data
        } catch (err : any) {
            return rejectWithValue(err.response.data)
        }
    })

export const logout = createAsyncThunk("auth/logout",
    async (_,{rejectWithValue}) => {
        try {
            await UserService.logout()
            localStorage.removeItem("token")
            return;
        } catch (err : any) {
            return rejectWithValue(err.response.data)
        }
    })
export const checkAuth = createAsyncThunk("auth/authMe",
    async (_,{dispatch,rejectWithValue}) => {
        try {
            const { data } = await axios.get<UserDto>("/users/refresh",{withCredentials : true})
            localStorage.setItem("token", data.accessToken)
            return data
        } catch (err : any) {
            return rejectWithValue(err.response.data)
        }
    })