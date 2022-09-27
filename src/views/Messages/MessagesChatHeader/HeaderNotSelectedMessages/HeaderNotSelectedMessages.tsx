import React, {FC, useMemo} from 'react';
import styles from "../MessagesChatHeader.module.scss";
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import OnlineStatus from "../../../../components/layout/OnlineStatus/OnlineStatus";
import HeaderRightIcons from "../HeaderRightIcons/HeaderRightIcons";
import {IConversation, IUser, UserDto} from "../../../../models";
import {getUserOnlineStatus} from "../../../../utils/functions";
import {useAppSelector} from "../../../../utils/hooks";


interface IProps {
    currentConversation : IConversation,
    user : UserDto | null
}

const HeaderNotSelectedMessages: FC<IProps> = ({ currentConversation, user }) => {

    const { onlineUsers } = useAppSelector( state => state.socket)

    const currentCompanion = useMemo(() => {
        if (currentConversation) {
            return (currentConversation.members as IUser[]).find(member => member._id !== user?.userInfo?._id)
        }
    }, [currentConversation])

    const isCompanionOnline = useMemo(() => {
        return getUserOnlineStatus(onlineUsers, currentCompanion!._id)
    }, [onlineUsers, currentCompanion])

    return (
        <>
            <div className={styles.left}>
                {
                    currentConversation.isGroupChat
                        ? <Avatar src={`/images/${currentConversation.image}`}
                                  sx={{borderRadius: 2, width: 40, height: 40}}/>
                        : <Link to={`/profile/${currentCompanion!._id}`}>
                            <Avatar src={`/images/${currentCompanion?.profilePicture}`}
                                    sx={{borderRadius: 2, width: 40, height: 40}}/>
                        </Link>
                }
                <div className={styles.left__info}>
                    <div className={styles.left__title}>
                        <Link to={`/profile/${currentCompanion!._id}`}>
                            {currentConversation.isGroupChat ? currentConversation.title : currentCompanion!.username}
                        </Link>
                    </div>
                    {currentConversation.isGroupChat && <div className={styles.left__members}>
                        {currentConversation.members.length} members
                    </div>}
                    {!currentConversation.isGroupChat && <div className={styles.left__status}>
                        <OnlineStatus isPersonOnline={isCompanionOnline}/>
                        { isCompanionOnline ? "online" : "offline"}
                    </div>}
                </div>
            </div>
            <div className={styles.right}>
                <HeaderRightIcons/>
            </div>
        </>
    );
}

export default HeaderNotSelectedMessages;