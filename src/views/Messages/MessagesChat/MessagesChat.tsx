import React, {FC, useState} from 'react';
import styles from './MessagesChat.module.scss';
import MessagesChatHeader from "../MessagesChatHeader/MessagesChatHeader";
import MessagesChatData from "../MessagesChatData/MessagesChatData";
import MessagesChatFooter from "../MessagesChatFooter/MessagesChatFooter";

interface IProps {
}

const MessagesChat: FC<IProps> = (props) => {

    return (
        <div className={styles.chat}>
            <MessagesChatHeader/>
            <div className={styles.body}>
               <MessagesChatData/>
            </div>
            <MessagesChatFooter/>
        </div>
    );
}

export default MessagesChat;