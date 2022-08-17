import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import usersSlice from "./users/users.slice";
import followersRequestsSlice from "./followersRequests/followersRequests.slice";
import followingRequestsSlice from "./followingRequests/followingRequests.slice";
import profileSlice from "./profile/profile.slice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        users : usersSlice,
        followers : followersRequestsSlice,
        following : followingRequestsSlice,
        profile : profileSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store