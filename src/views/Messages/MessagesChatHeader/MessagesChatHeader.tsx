import React, {FC, useMemo} from 'react';
import styles from './MessagesChatHeader.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {MoreHoriz, Phone, SearchRounded} from "@mui/icons-material";
import {IConversation, IUser, UserDto} from "../../../models";
import {Link} from "react-router-dom";
import cn from "classnames";
import {getUserOnlineStatus} from "../../../utils/functions";
import {useAppSelector} from "../../../utils/hooks";
import OnlineStatus from "../../../components/layout/OnlineStatus/OnlineStatus";

interface IProps {
    currentConversation: IConversation,
    user: UserDto | null
}

const MessagesChatHeader: FC<IProps> = ({currentConversation, user}) => {

    const { onlineUsers } = useAppSelector( state => state.socket)

    const currentCompanion = useMemo(() => { // if 1 vs 1 dialog
        if (currentConversation) {
            return (currentConversation.members as IUser[]).find(member => member._id !== user?.userInfo?._id)
        }
    }, [currentConversation])

    const isCompanionOnline = useMemo(() => { // if 1 vs 1 dialog
        return getUserOnlineStatus(onlineUsers, currentCompanion!._id)
    }, [onlineUsers, currentCompanion])


    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    {
                        currentConversation.isGroupChat
                            ? <Avatar src={"https://placepic.ru/wp-content/uploads/2021/02/kinopoisk_ru_Brad_Pi-41.jpg"}
                                      sx={{borderRadius: 2, width: 40, height: 40}}/>
                            : <Link to={`/profile/${currentCompanion!.username}`}>
                                <Avatar src={"https://placepic.ru/wp-content/uploads/2021/02/kinopoisk_ru_Brad_Pi-41.jpg"}
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
                    <IconButton>
                        <Phone/>
                    </IconButton>
                    <IconButton>
                        <SearchRounded/>
                    </IconButton>
                    <IconButton>
                        <MoreHoriz/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default MessagesChatHeader;