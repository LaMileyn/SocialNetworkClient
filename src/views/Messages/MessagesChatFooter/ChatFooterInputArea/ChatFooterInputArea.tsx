import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styles from "../MessagesChatFooter.module.scss";
import {IconButton} from "@mui/material";
import {EmojiEmotions} from "@mui/icons-material";
import AppEmoji from "../../../../components/layout/AppEmoji/AppEmoji";
import Picker, {IEmojiData} from "emoji-picker-react";


interface IProps {
    handleUpdateMessage: () => void,
    handleSendMessage: () => void,
    messageEditing: boolean,
    messageEditText: string,
    messageText: string,
    setMessageEditText: Dispatch<SetStateAction<string>>,
    setMessageText: Dispatch<SetStateAction<string>>,
    typingHandler: () => void

}

const ChatFooterInputArea: FC<IProps> = ({
                                             messageEditing,
                                             messageEditText,
                                             messageText,
                                             setMessageEditText,
                                             typingHandler,
                                             handleSendMessage,
                                             handleUpdateMessage,setMessageText
                                         }) => {

    const inputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            messageEditing
                ? handleUpdateMessage()
                : handleSendMessage()
        }
    }
    const [isEmoji, setIsEmoji] = useState(false)

    return (
        <div className={styles.bottom__field}>
            <div className={styles.inputWrapper}>
                <input type="text"
                       onKeyPress={inputKeyPress}
                       value={messageEditing ? messageEditText : messageText}
                       onChange={
                           messageEditing
                               ? (e) => setMessageEditText(e.currentTarget.value)
                               : (e) => {
                                   setMessageText(e.currentTarget.value)
                                   typingHandler()
                               }

                       }
                       placeholder={"Your message here.."}
                       autoFocus/>
                <IconButton onClick={ () => setIsEmoji(!isEmoji)}>
                    <EmojiEmotions/>
                </IconButton>
                {
                    isEmoji && <div className={styles.emoji} onClick={ e => e.stopPropagation()}>
                        <AppEmoji setValue={setMessageText}/>
                    </div>
                }

            </div>
        </div>
    );
}

export default ChatFooterInputArea;