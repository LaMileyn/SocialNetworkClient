import React, {FC} from 'react';
import styles from './FriendSmall.module.scss';
import {Avatar} from "@mui/material";
import {CheckCircleRounded} from "@mui/icons-material";
import {IUser} from "../../../models";


interface IProps{
    friend : IUser
}
const FriendSmall : FC<IProps> = ({ friend }) => {
    return (
        <div className={styles.friend}>
            <div className={styles.left}>
                <Avatar src={"/images/" + friend.profilePicture} sx={{
                    width: 50,
                    height: 50
                }}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>{ friend.username }<CheckCircleRounded /></div>
                <div className={styles.right__bottom}>@{friend._id}</div>
            </div>
        </div>
    );
}

export default FriendSmall;