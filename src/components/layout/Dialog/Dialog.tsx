import React, {FC, useMemo} from 'react';
import styles from './Dialog.module.scss';
import {Avatar} from "@mui/material";
import {IConversation, IMessage, IUser} from "../../../models";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import cn from "classnames";
import {changeConversation} from "../../../store/chat/chat.slice";
import {getFormattedAMPMDate, getTypingPeopleText} from "../../../utils/functions";


interface IProps {
    dialog : IConversation
}

const Dialog: FC<IProps> = ({ dialog }) => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector( state => state.auth )
    const {conversations : { currentConversation }, messages : { typingPeople }} = useAppSelector(state => state.chat)


    const dialogPartner = useMemo(() => {
        return (dialog.members as IUser[]).find( member => member._id !== user?.userInfo?._id)
    }, [dialog])

    const changeConversationHandler = () => {
        if (currentConversation?._id === dialog._id) return;
        dispatch(changeConversation(dialog))
    }
    const typingMessage = useMemo(() => {
        if (typingPeople[dialog._id] && typingPeople[dialog._id].length > 0) return getTypingPeopleText(typingPeople[dialog._id])
    }, [typingPeople, dialog])


    const lastMessage = (dialog.lastMessage as IMessage);
    return (
        <div className={cn(styles.dialog, {
            [styles.active]: currentConversation?._id === dialog._id
        })}
             onClick = {changeConversationHandler}
        >
            <div className={styles.avatar}>
                <Avatar src={dialog.isGroupChat ? "/images/" + dialog.image : "/images/" + dialogPartner?.profilePicture}
                        sx={{borderRadius: 2, width : 50, height: 50}}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <span className={styles.right__title}>{
                        dialog.isGroupChat
                            ? dialog.title
                            : dialogPartner?.username
                    }</span>
                    <span className={styles.right__time}>{getFormattedAMPMDate(dialog.updatedAt)}</span>
                </div>
                <div className={styles.right__bottom}>
                    {typingMessage && <div className={styles.typingBlock}>
                        <p>{typingMessage}</p>
                    </div> }
                    {!typingMessage && <p>{ dialog.lastMessage
                        ? lastMessage._id === user?.userInfo?._id
                            ? `Вы: ${lastMessage.text}`
                            : `${(lastMessage.sender as IUser).username}: ${lastMessage.text}`
                        : "Cписок сообщений пуст"
                    }</p>}
                </div>
            </div>
        </div>
    );
}

export default Dialog;