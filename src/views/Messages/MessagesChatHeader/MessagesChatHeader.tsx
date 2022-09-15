import React, {FC} from 'react';
import styles from './MessagesChatHeader.module.scss';
import {IConversation, UserDto} from "../../../models";
import {useAppSelector} from "../../../utils/hooks";

import HeaderSelectedMessages from "./HeaderSelectedMessages/HeaderSelectedMessages";
import HeaderNotSelectedMessages from "./HeaderNotSelectedMessages/HeaderNotSelectedMessages";

interface IProps {
    currentConversation: IConversation,
    user: UserDto | null
}

const MessagesChatHeader: FC<IProps> = ({currentConversation, user}) => {

    const { selectedMessages } = useAppSelector( state => state.chat.messages )

    return (
        <div className={styles.header}>
            <div className={styles.wrapper}>
                { ( selectedMessages && selectedMessages.length > 0)
                    ? <HeaderSelectedMessages selectedMessages={selectedMessages} user={user}/>
                    : <HeaderNotSelectedMessages currentConversation={currentConversation} user={user}/>
                }
            </div>
        </div>
    );
}

export default MessagesChatHeader;