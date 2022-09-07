import React, {FC, useMemo} from 'react';
import styles from './Dialog.module.scss';
import {Avatar} from "@mui/material";
import {IConversation, IUser} from "../../../models";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import cn from "classnames";
import {changeConversation} from "../../../store/chat/chat.slice";

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

    return (
        <div className={cn(styles.dialog, {
            [styles.active]: currentConversation?._id === dialog._id
        })}
             onClick = {changeConversationHandler}
        >
            <div className={styles.avatar}>
                <Avatar src={dialog.isGroupChat ? "/images/" + dialog.image : "/images/" + dialogPartner?.profilePicture}
                        sx={{borderRadius: 2, width : 60, height: 60}}/>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <span className={styles.right__title}>{
                        dialog.isGroupChat
                            ? dialog.title
                            : dialogPartner?.username
                    }</span>
                    <span className={styles.right__time}>{dialog.lastMessage ? (dialog.lastMessage as string).split("T")[0] : ""}</span>
                </div>
                <div className={styles.right__bottom}>
                    <p>Вы: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, beatae cumque deleniti
                        doloremque hic ipsa, iure natus nesciunt praesentium quibusdam quidem repellat similique ut
                        veritatis.</p>
                </div>
            </div>
        </div>
    );
}

export default Dialog;