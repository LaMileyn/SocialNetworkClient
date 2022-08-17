import {IUser} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cancelFollow, followPerson, getFollowingRequests} from "./followingRequests.actions";

interface SliceState {
    followingRequests: Array<IUser> | null,
    fetching: boolean,
    error: null,
}

const initialState: SliceState = {
    followingRequests: null,
    fetching: false,
    error: null
}
const followingRequestsSlice = createSlice({
    name: "followingRequests",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            // get followingReq
            .addCase(getFollowingRequests.pending, (state) => {
                state.fetching = true
            })
            .addCase(getFollowingRequests.fulfilled, (state, action: PayloadAction<Array<IUser>>) => {
                state.fetching = false
                state.followingRequests = action.payload
            })
            .addCase(getFollowingRequests.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // cancelFollow
            .addCase(cancelFollow.pending, (state) => {
                state.fetching = true
            })
            .addCase(cancelFollow.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                state.followingRequests = state.followingRequests!.filter(person => person._id !== action.payload);
            })
            .addCase(cancelFollow.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // followPerson
            .addCase(followPerson.pending, (state) => {
                state.fetching = true
            })
            .addCase(followPerson.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.fetching = false
                if (!state.followingRequests) state.followingRequests = []
                state.followingRequests.push(action.payload)
            })
            .addCase(followPerson.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
})
export const {} = followingRequestsSlice.actions;
export default followingRequestsSlice.reducer;