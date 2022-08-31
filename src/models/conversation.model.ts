import {IUser} from "./user.model";
import {IMessage} from "./message.model";

export interface IConversation {
    _id : string,
    members : Array<IUser> | Array<string>,
    image : string,
    title : string,
    creator : IUser | string,
    admins : Array<IUser> | Array<string>,
    isGroupChat : boolean,
    lastMessage : IMessage | string,
    createdAt : string,
    updatedAt : string
}
export interface CreateConversationModel {
    members : Array<IUser> | Array<string>,
    image : string,
    title : string,
    creator : IUser | string,
    admins : Array<IUser> | Array<string>,
    isGroupChat : boolean,
}