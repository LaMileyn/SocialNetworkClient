import {AnyAction, AsyncThunk, configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import usersSlice from "./users/users.slice";
import profileSlice from "./profile/profile.slice";
import themeSlice from "./theme/theme.slice";
import postsSlice from "./posts/posts.slice";
import socketSlice from "./socket/socket.slice";
import chatSlice from "./chat/chat.slice";


const store = configureStore({
    reducer : {
        auth     : authSlice,
        users    : usersSlice,
        profile  : profileSlice,
        theme    : themeSlice,
        posts    : postsSlice,
        socket   : socketSlice,
        chat     : chatSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

export function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}
export function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
export default store;