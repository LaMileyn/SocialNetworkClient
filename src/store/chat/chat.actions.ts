import {createAsyncThunk} from "@reduxjs/toolkit";
import conversationService from "../../services/conversation-service";
import messageService from "../../services/message-service";
import {IConversation, IMessage} from "../../models";
import {CreateMessageModel} from "../../models/message.model";
import {CreateConversationModel} from "../../models/conversation.model";
import {addNewMessage, deleteChatMessages, updateMessage} from "./chat.slice";


export const getAllConversations = createAsyncThunk("chat/getConversations", async (_, {rejectWithValue}) => {
    try {
        const {data} = await conversationService.getConversations();
        console.log(data)
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})
export const getMessages = createAsyncThunk("chat/getMessages", async (conversationId : string, {rejectWithValue}) => {
    try {
        const {data} = await messageService.getMessages(conversationId);
        return {
            data,
            conversationId
        }
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})
export const createMessage = createAsyncThunk("chat/createMessage", async (params : {
    message : CreateMessageModel
}, {rejectWithValue, dispatch}) => {
    try {
        const { message} = params;
        const {data} = await messageService.createMessage(message);
        dispatch(addNewMessage({
            conversation: message.conversation as IConversation,
            message: data,
            fromMe : true
        }))
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})

export const createConversation = createAsyncThunk("chat/createConversation", async (body : CreateConversationModel, {rejectWithValue}) => {
    try {
        const {data} = await conversationService.createConversation(body)
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})

export const deleteMessages = createAsyncThunk("chat/delete/message", async (params : {
    messages : IMessage[]
}, {rejectWithValue,dispatch}) => {
    try {
        const { messages } = params;
        await messageService.deleteMessages(messages)
        dispatch(deleteChatMessages({
            messages,
            fromMe : true
        }))
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})

export const updateOurMessage = createAsyncThunk("chat/update/message", async (params : {
    id : string, newOne : CreateMessageModel, isLast : boolean
}, {rejectWithValue,dispatch}) => {
    try {
        const { isLast, newOne, id} = params;
        const { data } = await messageService.updateMessage(id, newOne)
        dispatch(updateMessage({
            updatedMessage : data,
            isLast,
            fromMe : true
        }))
        return data
    } catch (err : any) {
        return rejectWithValue(err.response.data)
    }
})