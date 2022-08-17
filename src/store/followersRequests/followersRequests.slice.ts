import {IUser} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {acceptFriendship, getFollowersRequests} from "./followersRequests.actions";

interface SliceState {
    followersRequests: Array<IUser> | null,
    fetching: boolean,
    error: null,
}

const initialState: SliceState = {
    followersRequests: null,
    fetching: false,
    error: null
}
const followersRequestsSlice = createSlice({
    name: "friendsRequests",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            // get Followers req
            .addCase(getFollowersRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(getFollowersRequests.fulfilled, (state, action : PayloadAction<Array<IUser>>) => {
                state.fetching = false
                state.followersRequests = action.payload
            })
            .addCase(getFollowersRequests.rejected, (state, action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // accept
            .addCase(getFollowersRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(acceptFriendship.fulfilled, (state, action : PayloadAction<IUser>) => {
                state.fetching = false
                state.followersRequests = state.followersRequests!.filter( person => person._id !== action.payload._id);
            })
            .addCase(getFollowersRequests.rejected, (state, action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // reject
            .addCase(getFollowersRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(acceptFriendship.fulfilled, (state, action : PayloadAction<IUser>) => {
                state.fetching = false
                state.followersRequests = state.followersRequests!.filter( person => person._id !== action.payload._id);
            })
            .addCase(getFollowersRequests.rejected, (state, action : PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })

})

export const {} = followersRequestsSlice.actions;
export default followersRequestsSlice.reducer;