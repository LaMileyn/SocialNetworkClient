import {IUser} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCurrentUser, getFriends, unFollowFriend} from "./friends.actions";
import {acceptFriendship} from "../followersRequests/followersRequests.actions";

interface SliceState {
    friends: Array<IUser> | null,
    currentUser: IUser | null
    fetching: boolean,
    error: null,
}

const initialState: SliceState = {
    friends: null,
    currentUser: null,
    fetching: false,
    error: null
}
const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            // get current user
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.currentUser = action.payload
            })
            // get friends
            .addCase(getFriends.pending, (state) => {
                state.fetching = true
            })
            .addCase(getFriends.fulfilled, (state, action: PayloadAction<Array<IUser>>) => {
                state.fetching = false
                state.friends = action.payload
            })
            .addCase(getFriends.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // unFollow
            .addCase(unFollowFriend.pending, (state) => {
                state.fetching = true
            })
            .addCase(unFollowFriend.fulfilled, (state, action: PayloadAction<string>) => {
                state.fetching = false
                state.friends = state.friends!.filter(friend => friend._id !== action.payload);
            })
            .addCase(unFollowFriend.rejected, (state, action: PayloadAction<any>) => {
                state.fetching = false
                state.error = action.payload
            })
            // acceptFriend
            .addCase(acceptFriendship.fulfilled, (state, action: PayloadAction<IUser>) => {
                if (!state.friends){
                    state.friends = []
                }
                state.friends.push(action.payload)
            })

})

export const { } = friendsSlice.actions;
export default friendsSlice.reducer;