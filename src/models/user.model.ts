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
    desc: string,
    createdAt : string,
    updatedAt : string
}