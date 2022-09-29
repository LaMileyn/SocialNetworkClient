import React, {FC} from 'react';
import styles from './FriendRowItem.module.scss';
import {IUser} from "../../../../models";
import {Avatar} from "@mui/material";
import FriendRowActions from "./FriendRowActions/FriendRowActions";
import {Link} from "react-router-dom";

interface IProps {
    user: IUser
}

const FriendRowItem: FC<IProps> = ({user}) => {

    return (
        <div className={styles.user}>
            <Link to={`/profile/${user._id}`}>
                <Avatar src={`/images/${user.profilePicture}`} sx={{width: 85, height: 85}}/>
            </Link>
            <div className={styles.right}>
                <Link to={`/profile/${user._id}`}>
                    <div className={styles.right__username}>{user.username}</div>
                </Link>
                <FriendRowActions user={user}/>
            </div>
        </div>
    );
}

export default FriendRowItem;