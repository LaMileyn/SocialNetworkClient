import {IUser} from "./user.model";

export interface IPost {
    _id : string,
    user : IUser | string,
    img : string,
    desc : string,
    likes : Array<IUser> | Array<string>,
    views : number,
    isFixed : boolean,
    createdAt : string,
    updatedAt : string
}
export interface PostUpdateModel {
    desc : string,
    img? : string
}
export interface PostCreateModel extends PostUpdateModel{
    user : string, // creator of the post
}
