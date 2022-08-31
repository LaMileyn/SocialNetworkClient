import {IUser} from "./user.model";
import {IConversation} from "./conversation.model";

export interface IMessage {
    _id : string,
    sender : IUser | string,
    conversation : IConversation | string,
    text : string,
    updated : boolean,
    createdAt : string,
    updatedAt : string
}
export interface CreateMessageModel {
    sender : IUser | string,
    conversation : IConversation | string,
    text : string,
    updated : boolean
}