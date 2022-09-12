import React, {FC} from 'react';
import {IMessage, IUser} from "../../../models";
import styles from './Message.module.scss';
import {Avatar} from "@mui/material";
import cn from 'classnames'
import {getFormattedAMPMDate} from "../../../utils/functions";


interface IProps {
    message: IMessage,
    isOwner : boolean,
}

const Message: FC<IProps> = ({message, isOwner}) => {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <Avatar src={""} sx={{borderRadius: 2, width: 40, height: 40}}/>
                <div className={styles.right}>
                    <div className={styles.right__top}>
                        <div className={cn(styles.right__name, {
                            [styles.right__name_owner] : isOwner
                        })}>{ (message.sender as IUser).username}</div>
                        <div className={styles.right__time}>{ getFormattedAMPMDate(message.updatedAt)}</div>
                    </div>
                    <div className={styles.right__text}>
                        <p>{message.text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;