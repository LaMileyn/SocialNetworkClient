import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import usersSlice from "./users/users.slice";
import profileSlice from "./profile/profile.slice";
import themeSlice from "./theme/theme.slice";
import postsSlice from "./posts/posts.slice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        users : usersSlice,
        profile : profileSlice,
        theme : themeSlice,
        posts : postsSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store