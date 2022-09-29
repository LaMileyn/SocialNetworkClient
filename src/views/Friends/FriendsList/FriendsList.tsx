import React, {FC} from 'react';
import styles from './FriendsList.module.scss'
import {IUser} from "../../../models";
import FriendRowItem from "./FriendRowItem/FriendRowItem";


interface IProps {
    data: IUser[]
}

const FriendsList: FC<IProps> = ({data}) => {
    return (
        <div className={styles.list}>
            {
                data.length === 0 && <div className={styles.empty}>
                    <p>#No users found</p>
                </div>
            }
            {
                data.map(user => (
                    <FriendRowItem key={user._id} user={user}/>
                ))
            }
        </div>
    );
}

export default FriendsList;