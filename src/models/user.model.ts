import {IPost} from "./post.model";

export interface IUser {
    _id : string,
    username : string,
    email : string,
    status : string,
    location : {
        city : string,
        country : string
    },
    activated : boolean,
    activationLink : string,
    profilePicture : string,
    coverPicture : string,
    followers : Array<IUser> | Array<string>,
    followersRequests : Array<IUser> | Array<string>,
    followingRequests : Array<IUser> | Array<string>,
    isAdmin : boolean,
    posts : IPost[] | string[],
    desc: string,
    createdAt : string,
    updatedAt : string
}
export interface UserAuthorizationModel {
    email : string,
    password : string,
}
export interface UpdateUserModel {
    username? : string,
    email? : string,
    location? : {
        city : string,
        country : string
    },
    profilePicture? : string,
    coverPicture? : string,
    desc?: string,
    status? : string,

}
export interface UserRegistrationModel extends UserAuthorizationModel{
    username : string,
    repeatPassword : string
}
export interface UserDto{
    accessToken : string,
    refreshToken : string,
    userInfo : IUser
    // userInfo : {
    //     id : string,
    //     email : string,
    //     activated : boolean,
    //     username : string,
    //     profilePicture : string
    // }
}