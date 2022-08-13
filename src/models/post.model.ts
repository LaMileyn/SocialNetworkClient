import {IUser} from "./user.model";

export interface IPost {
    _id : string,
    user : Array<IUser> | Array<string>,
    img : string,
    likes : Array<IUser> | Array<string>,
    views : number
    createdAt : string,
    updatedAt : string
}