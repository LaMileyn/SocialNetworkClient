// import React, {FC, useEffect, useState} from 'react';
// import {IUser} from "../../../../models";
// import {useFetching} from "../../../../utils/hooks";
// import userService from "../../../../services/user-service";
//
//
// interface IProps {
// }
//
// const MessagesCreateBarUsers: FC<IProps> = (props) => {
//
//     const [peopleSearchValue, setPeopleSearchValue] = useState<string>("");
//     const [friends, setFriends] = useState<IUser[]>([])
//
//     const [fetchFriends, isFriendsLoading, error] = useFetching(async () => {
//         const {data} = await userService.getFriends(user!.userInfo!._id)
//         setFriends(data)
//     })
//
//     useEffect(() => {
//         fetchFriends()
//     }, [])
//     return (
//         <div></div>
//     );
// }
//
// export default MessagesCreateBarUsers;
export {}