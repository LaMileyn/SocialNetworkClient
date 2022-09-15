import React, {FC, useMemo} from 'react';
import styles from './DialogMessage.module.scss'
import {IConversation, IMessage, IUser, UserDto} from "../../../../models";
import {getTypingPeopleText} from "../../../../utils/functions";


interface IProps {
    typingPeople :  {
        [p: string]: IUser[]
    },
    dialog : IConversation,
    user : UserDto | null
}

const DialogMessage: FC<IProps> = ( {dialog, typingPeople, user }) => {
    const lastMessage = (dialog.lastMessage as IMessage);
    const typingMessage = useMemo(() => {
        if (typingPeople[dialog._id] && typingPeople[dialog._id].length > 0) return getTypingPeopleText(typingPeople[dialog._id])
    }, [typingPeople, dialog])
    return (
        <div>
            {typingMessage && <div className={styles.typingBlock}>
                <p className={styles.paragraph}>{typingMessage}</p>
            </div>}
            {!typingMessage && <p className={styles.paragraph}>{dialog.lastMessage
                ? lastMessage._id === user?.userInfo?._id
                    ? `Вы: ${lastMessage.text}`
                    : `${(lastMessage.sender as IUser).username}: ${lastMessage.text}`
                : "Cписок сообщений пуст"
            }</p>}
        </div>
    );
}

export default DialogMessage;