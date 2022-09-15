import React, {FC, useMemo} from 'react';
import {IMessage, IUser} from "../../../models";
import styles from './Message.module.scss';
import {Avatar} from "@mui/material";
import cn from 'classnames'
import {getFormattedAMPMDate} from "../../../utils/functions";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {addToSelectedMessages, removeFromSelectedMessages} from "../../../store/chat/chat.slice";


interface IProps {
    message: IMessage,
    isOwner : boolean,
}

const Message: FC<IProps> = ({message, isOwner}) => {
    const dispatch = useAppDispatch()
    const { selectedMessages } = useAppSelector(state => state.chat.messages)
    const messageSelectHandler = () => {
        if (isOwner) {
            isMessageSelected
                ? dispatch(removeFromSelectedMessages(message._id))
                : dispatch(addToSelectedMessages(message))
        }
    }
    const isMessageSelected = useMemo(() => {
        return selectedMessages?.find(mess => mess._id === message._id)
    }, [selectedMessages])
    return (
        <div className={cn(styles.container, {
            [styles.selected]: isMessageSelected
        })} onClick={messageSelectHandler}>
            <div className={cn(styles.message, {
                [styles.owner] : isOwner
            })}>
                { !isOwner && <Avatar src={""} sx={{borderRadius: 2, width: 40, height: 40}}/> }
                <div className={styles.right}>
                    <div className={styles.right__top}>
                        <div className={cn(styles.right__name, {
                            [styles.right__name_owner] : isOwner
                        })}>{ (message.sender as IUser).username}</div>
                        <div className={styles.right__time}>{ getFormattedAMPMDate(message.updatedAt)}</div>
                    </div>
                    <div className={styles.right__text}>
                        <p>
                            { message.text }
                            { message.updated && <span>(ред.)</span>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;