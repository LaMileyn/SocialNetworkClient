import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './MessagesChat.module.scss';
import MessagesChatHeader from "../MessagesChatHeader/MessagesChatHeader";
import MessagesChatData from "../MessagesChatData/MessagesChatData";
import MessagesChatFooter from "../MessagesChatFooter/MessagesChatFooter";
import chatBackgroundDark from './../../../assets/images/chatBg.png'
import chatBackgroundLight from './../../../assets/images/chatBgLight.png'
import {useAppSelector} from "../../../utils/hooks";
import MessagesChatNotChosen from "../MessagesChatNotChosen/MessagesChatNotChosen";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}

const MessagesChat: FC<IProps> = ({ setDialogCreating}) => {

    const theme = useAppSelector( state => state.theme)
    const {  currentConversation  } = useAppSelector( state => state.chat.conversations )
    const { user } = useAppSelector( state => state.auth )



    if (!currentConversation) return <div className={styles.noChat}>
        <MessagesChatNotChosen setDialogCreating={setDialogCreating}/>
    </div>

    return (
        <div className={styles.chat} style = {{
            backgroundImage : `url(${ theme == "dark" ? chatBackgroundDark : chatBackgroundLight})`
        }}>
            <MessagesChatHeader currentConversation={currentConversation} user={user}/>
            <div className={styles.body}>
                <MessagesChatData/>
            </div>
            <MessagesChatFooter currentConversation={currentConversation} sender={user!.userInfo}/>
        </div>
    );
}

export default React.memo(MessagesChat);