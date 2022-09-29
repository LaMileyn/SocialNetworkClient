import React, {FC} from 'react';
import styles from './FriendsRequestsExtra.module.scss';
import BlockHeaderBorder from "../../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {IUser} from "../../../../models";
import FriendsList from "../../FriendsList/FriendsList";

interface IProps {
    followersRequests: IUser[]
}

const FriendsRequestsExtra: FC<IProps> = ({followersRequests}) => {
    return (
        <div className={styles.extra}>
            <BlockHeaderBorder>
                <div className={styles.extraTitle}>
                    Followers Requests <span>{followersRequests.length}</span>
                </div>
            </BlockHeaderBorder>
            <FriendsList data={followersRequests}/>
        </div>
    );
}

export default FriendsRequestsExtra;