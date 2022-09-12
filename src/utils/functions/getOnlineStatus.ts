import {OnlineUserModel} from "../../models/user.model";

export const getUserOnlineStatus = (onlineUsers : OnlineUserModel[],currentUserId : string) =>{
    return Boolean(onlineUsers.find(user => user.userId === currentUserId))
}