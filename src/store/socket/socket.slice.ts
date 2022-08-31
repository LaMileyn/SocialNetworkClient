import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Socket} from "socket.io-client";


// interface ServerToClientEvents {
//     noArg: () => void;
//     basicEmit: (a: number, b: string, c: Buffer) => void;
//     withAck: (d: string, callback: (e: number) => void) => void;
// }
//
// interface ClientToServerEvents {
//     hello: () => void;
// }

type SliceState = {
    socket : any | null,
    onlineUsers : string[],
    fetching : boolean,
    error : any
}

const initialState : SliceState= {
    socket: null,
    onlineUsers: [],
    fetching: false,
    error: null,
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action : PayloadAction<any>) => {
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action: PayloadAction<string[]>) => {
            state.onlineUsers = action.payload
        }
    },
})
export const {setSocket,setOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;