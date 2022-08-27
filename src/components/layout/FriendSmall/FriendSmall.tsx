import React, {FC} from 'react';
import styles from './FriendSmall.module.scss';
import {Avatar} from "@mui/material";
import {CheckCircleRounded} from "@mui/icons-material";
const FriendSmall : FC = (props) => {
    return (
        <div className={styles.friend}>
            <div className={styles.left}>
                <Avatar src={""} sx={{
                    width: 50,
                    height: 50
                }}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>Kate Lingard <CheckCircleRounded /></div>
                <div className={styles.right__bottom}>@katie14</div>
            </div>
        </div>
    );
}

export default FriendSmall;