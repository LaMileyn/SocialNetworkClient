import React, {FC} from 'react';
import {IUser} from "../../../../models";
import FriendSmall from "../../../../components/layout/FriendSmall/FriendSmall";


interface IProps {
    friends : IUser[]
}

const ProfileFriendsList: FC<IProps> = ({ friends }) => {
    return (
        <div>
            {
                friends.map((friend) => {
                    return <FriendSmall key={friend._id} friend={friend}/>
                })
            }
        </div>
    );
}

export default ProfileFriendsList;