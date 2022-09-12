import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConversation, IMessage, IUser} from "../../models";
import {createConversation, getAllConversations, getMessages} from "./chat.actions";


type StateSlice = {
    messages: {
        fetching: boolean,
        data: {
            [key: string]: IMessage[]
        },
        error: any,
        selectedMessages: IMessage[] | null,
        messageEditing: boolean,
        messageEditingData: IMessage | null,
        typingPeople: {
            [key: string]: IUser[]
        }
    },
    conversations: {
        fetching: boolean,
        data: IConversation[] | null,
        error: any,
        currentConversation: IConversation | null,
        previousConversation: IConversation | null,
    },
}
const initialState: StateSlice = {
    messages: {
        fetching: false,
        data: {},
        error: null,
        selectedMessages: null,
        messageEditing: false,
        messageEditingData: null,
        typingPeople: {}
    },
    conversations: {
        fetching: false,
        data: null,
        error: null,
        currentConversation: null,
        previousConversation: null,
    },
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sortConversationsByUpdated: (state) => {
            if (!state.conversations.data) return;
            state.conversations.data = state.conversations.data.sort((a, b) => {
                return +new Date(b.updatedAt) - +new Date(a.updatedAt)
            });
        },
        addNewMessage: (state, action: PayloadAction<{ conversation: IConversation, message: IMessage, fromMe: boolean }>) => {

            state.messages.data[action.payload.conversation._id].push(action.payload.message);

            if (state.conversations.currentConversation) {
                state.conversations.currentConversation = {
                    ...state.conversations.currentConversation,
                    lastMessage: action.payload.message
                }
            }

            state.conversations.data = state.conversations.data!
                .map(conversation => conversation._id === action.payload.conversation._id
                    ? {
                        ...conversation,
                        updatedAt: new Date().toString(),
                        lastMessage: action.payload.message
                    }
                    : conversation)

            action.payload.fromMe && chatSlice.caseReducers.sortConversationsByUpdated(state)
        },
        deleteChatMessages: (state, action: PayloadAction<{ messages: IMessage[], fromMe: boolean }>) => {
            const messages = action.payload.messages;
            const conversationId = messages[0].conversation as string;
            state.messages.data[conversationId] = state.messages.data[conversationId]!.filter(el => !messages.find(curr => curr._id === el._id))
            state.conversations.data = state.conversations.data!.map(conversation => conversation._id === conversationId ? {
                ...conversation,
                lastMessage: state.messages.data[conversationId]![state.messages.data[conversationId]!.length - 1]
            } : conversation)
            if (action.payload.fromMe) state.messages.selectedMessages = []
        },
        updateMessage: (state, action: PayloadAction<{ updatedMessage: IMessage, isLast: boolean, fromMe: boolean }>) => {
            const {updatedMessage, isLast, fromMe} = action.payload

            //changing message
            state.messages.data[(updatedMessage.conversation as IConversation)._id]
                = state.messages.data[(updatedMessage.conversation as IConversation)._id]!.map(mess => mess._id === updatedMessage._id
                ? updatedMessage
                : mess
            )

            if (isLast && state.conversations.currentConversation) {
                state.conversations.currentConversation = {
                    ...state.conversations.currentConversation,
                    lastMessage: updatedMessage
                }
                state.conversations.data = state.conversations.data!.map(conversation => conversation._id === (updatedMessage.conversation as IConversation)._id
                    ? state.conversations.currentConversation as IConversation
                    : conversation)
            }

            if (fromMe) {
                state.messages.messageEditing = false
                state.messages.messageEditingData = null
                state.messages.selectedMessages = []
            }
        },
        addTypingMan: (state, action: PayloadAction<{ room: string, user: IUser }>) => {
            if (!state.messages.typingPeople[action.payload.room]) {
                state.messages.typingPeople[action.payload.room] = []
            }
            state.messages.typingPeople[action.payload.room].push(action.payload.user)
        },
        deleteTypingMan: (state, action: PayloadAction<{ room: string, userId: string }>) => {
            state.messages.typingPeople[action.payload.room] = state.messages.typingPeople[action.payload.room].filter(el => el._id !== action.payload.userId)
        },
        addToSelectedMessages: (state, action: PayloadAction<IMessage>) => {
            if (!state.messages.selectedMessages) state.messages.selectedMessages = []
            state.messages.selectedMessages.push(action.payload)
        },
        changeConversation: (state, action: PayloadAction<IConversation>) => {
            state.conversations.previousConversation = state.conversations.currentConversation
            state.conversations.currentConversation = action.payload
        },
        changeMessageEditing: (state, action: PayloadAction<boolean>) => {
            state.messages.messageEditing = action.payload
        },
        setEditingMessageData: (state, action: PayloadAction<IMessage>) => {
            state.messages.messageEditingData = action.payload
        },
    },
    extraReducers: builder => builder

        .addCase(getAllConversations.pending, (state) => {
            state.conversations.fetching = true
        })
        .addCase(getAllConversations.fulfilled, (state, action: PayloadAction<IConversation[]>) => {
            state.conversations.fetching = false;
            state.conversations.data = action.payload;
            chatSlice.caseReducers.sortConversationsByUpdated(state)
        })
        .addCase(getAllConversations.rejected, (state) => {
            state.conversations.fetching = false
        })

        .addCase(getMessages.pending, (state) => {
            state.messages.fetching = true
        })
        .addCase(getMessages.fulfilled, (state, action: PayloadAction<{ data: IMessage[], conversationId: string }>) => {
            state.messages.fetching = false;
            state.messages.data[action.payload.conversationId] = action.payload.data;
        })
        .addCase(getMessages.rejected, (state) => {
            state.messages.fetching = false
        })

        .addCase(createConversation.fulfilled, (state, action) => {
            if (!state.conversations.data) state.conversations.data = []
            state.conversations.data.push(action.payload);
            chatSlice.caseReducers.sortConversationsByUpdated(state)
            state.conversations.currentConversation = action.payload
            // if (state.conversations.currentConversation) state.conversations.currentConversation = action.payload;
            state.messages.data[action.payload._id] = []
        })


})

export const {
    addTypingMan, deleteTypingMan,
    addNewMessage, addToSelectedMessages,
    changeMessageEditing, setEditingMessageData, changeConversation,
    updateMessage, deleteChatMessages,
    sortConversationsByUpdated
} = chatSlice.actions;
export default chatSlice.reducer;