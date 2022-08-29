import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../../services/user-service";

export const getCurrentUser = createAsyncThunk("setting/getuser" , async (id : string,thunkApi) =>{
    try {
        const { data } = await UserService.getUser(id);
        return data
    }catch (err : any){
        return thunkApi.rejectWithValue(err.response.data)
    }
})