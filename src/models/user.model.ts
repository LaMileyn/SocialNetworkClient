export interface IUser<T> {
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
    followers : Array<T>,
    followersRequests : Array<T>,
    followingRequests : Array<T>,
    isAdmin : boolean,
    desc: string,
    createdAt : string,
    updatedAt : string
}
export interface UserAuthorizationModel {
    email : string,
    password : string,
}
export interface UserRegistrationModel extends UserAuthorizationModel{
    username : string,
    repeatPassword : string
}
export interface UserDto{
    accessToken : string,
    refreshToken : string,
    userInfo : {
        _id : string,
        email : string,
        activated : boolean,
        username : string,
        profilePicture : string
    }
}