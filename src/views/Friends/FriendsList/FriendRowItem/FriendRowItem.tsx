import React, {FC} from 'react';
import styles from './FriendRowItem.module.scss';
import {IUser} from "../../../../models";
import {Avatar} from "@mui/material";
import FriendRowActions from "./FriendRowActions/FriendRowActions";

interface IProps {
    user : IUser
}

const FriendRowItem: FC<IProps> = ({ user }) => {

    return (
        <div className={styles.user}>
            <Avatar src={`/images/${user.profilePicture}`} sx={{ width : 85, height: 85}}/>
            <div className={styles.right}>
                <div className={styles.right__username}>{user.username}</div>
                <FriendRowActions user={user}/>
            </div>
        </div>
    );
}

export default FriendRowItem;