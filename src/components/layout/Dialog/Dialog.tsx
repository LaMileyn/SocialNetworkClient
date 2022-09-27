import React, {FC, useMemo} from 'react';
import styles from './Dialog.module.scss';
import {Avatar} from "@mui/material";
import {IConversation, IUser} from "../../../models";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import cn from "classnames";
import {changeConversation} from "../../../store/chat/chat.slice";
import {getFormattedAMPMDate, getUserOnlineStatus} from "../../../utils/functions";
import DialogMessage from "./DialogMessage/DialogMessage";
import OnlineStatus from "../OnlineStatus/OnlineStatus";


interface IProps {
    dialog: IConversation
}

const Dialog: FC<IProps> = ({dialog}) => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.auth)
    const {onlineUsers} = useAppSelector(state => state.socket)
    const {conversations: {currentConversation}, messages: {typingPeople}} = useAppSelector(state => state.chat)


    const dialogPartner = useMemo(() => {
        return (dialog.members as IUser[]).find(member => member._id !== user?.userInfo?._id)
    }, [dialog])

    const changeConversationHandler = () => {
        if (currentConversation?._id === dialog._id) return;
        dispatch(changeConversation(dialog))
    }
    const isCompanionOnline = useMemo(() => {
        return getUserOnlineStatus(onlineUsers, dialogPartner!._id)
    }, [onlineUsers, dialogPartner])

    console.log(isCompanionOnline)
    return (
        <div className={cn(styles.dialog, {
            [styles.active]: currentConversation?._id === dialog._id
        })}
             onClick={changeConversationHandler}
        >
            <Avatar src={dialog.isGroupChat ? "/images/" + dialog.image : "/images/" + dialogPartner?.profilePicture}
                    sx={{borderRadius: 2, width: 50, height: 50}}/>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <div>
                        <div className={styles.right__title}>{
                            dialog.isGroupChat
                                ? dialog.title
                                : dialogPartner?.username
                        }
                        </div>
                        { isCompanionOnline && !dialog.isGroupChat &&<OnlineStatus isPersonOnline={isCompanionOnline}/> }
                    </div>
                    <span className={styles.right__time}>{getFormattedAMPMDate(dialog.updatedAt)}</span>
                </div>
                <div className={styles.right__bottom}>
                    <DialogMessage user={user} dialog={dialog} typingPeople={typingPeople}/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Dialog);