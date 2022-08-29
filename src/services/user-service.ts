import $api from './index';
import {IUser, UserAuthorizationModel, UserDto, UserRegistrationModel} from "../models";
import {UpdateUserModel} from "../models/user.model";


class UsersApi {
    getUser(userId : string) {
        return $api.get<IUser>(`users/${userId}`)
    }
    updateUser(data : UpdateUserModel){
        return $api.put<IUser>(`users`, data)
    }
    login(user : UserAuthorizationModel) {
        return $api.post<UserDto>(`users/login`, user)
    }

    logout() {
        return $api.post<string>(`users/logout`)
    }

    register(user : UserRegistrationModel) {
        return $api.post<UserDto>(`users/register`, user)
    }

    getFriends(userId : string) {
        return $api.get<Array<IUser>>(`users/friends/${userId}`)
    }

    // create a request to follow a man
    follow(userToFollow : string) {
        return $api.put<string>(`users/${userToFollow}/follow`)
    }

    unFollow(userToUnfollow : string) {
        return $api.put<string>(`users/${userToUnfollow}/unfollow`)
    }

    acceptFriendship(userToAccept : string) {
        return $api.put<string>(`users/friends/accept/${userToAccept}`)
    }

    rejectFriendship(userToReject : string) {
        return $api.put<string>(`users/friends/reject/${userToReject}`)
    }

    cancelFollowRequest(receiverId : string) {
        return $api.put<string>(`users/friends/cancelFollowRequest/${receiverId}`)
    }

    allUsers(search : string,isFriend : boolean) {
        return $api.get<Array<IUser>>(`users?search=${search}&isFriend=${isFriend}`)
    }

    userFollowersRequests() {
        return $api.get<Array<IUser>>(`users/friends/followersRequests`)
    }

    userFollowingRequests() {
        return $api.get<Array<IUser>>(`users/friends/followingRequests`)
    }



}

export default new UsersApi();