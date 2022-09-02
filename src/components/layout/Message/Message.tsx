import React, {FC} from 'react';
import {IMessage} from "../../../models";
import styles from './Message.module.scss';
import {Avatar} from "@mui/material";

interface IProps {
    message: IMessage
}

const Message: FC<IProps> = ({message}) => {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <Avatar src={""} sx={{borderRadius: 2, width: 40, height: 40}}/>
                <div className={styles.right}>
                    <div className={styles.right__top}>
                        <div className={styles.right__name}>Jonathan Hope</div>
                        <div className={styles.right__time}>10:35 PM</div>
                    </div>
                    <div className={styles.right__text}>
                        <p>Thanks for the hardworking day.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;