import React, {FC, useState} from 'react';
import styles from './MessagesChat.module.scss';
import MessagesChatHeader from "../MessagesChatHeader/MessagesChatHeader";
import MessagesChatData from "../MessagesChatData/MessagesChatData";

interface IProps {
}

const MessagesChat: FC<IProps> = (props) => {

    return (
        <div className={styles.chat}>
            <MessagesChatHeader/>
            <div className={styles.body}>
               <MessagesChatData/>
            </div>
        </div>
    );
}

export default MessagesChat;