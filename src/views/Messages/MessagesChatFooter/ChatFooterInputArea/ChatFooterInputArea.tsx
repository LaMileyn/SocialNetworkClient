import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "../MessagesChatFooter.module.scss";
import {IconButton} from "@mui/material";
import {EmojiEmotions} from "@mui/icons-material";



interface IProps {
    handleUpdateMessage :  () => void,
    handleSendMessage :  () => void,
    messageEditing : boolean,
    messageEditText: string,
    messageText: string,
    setMessageEditText : Dispatch<SetStateAction<string>>
    typingHandler : (e: React.ChangeEvent<HTMLInputElement>) => void

}

const ChatFooterInputArea: FC<IProps> = ({messageEditing,messageEditText,messageText,setMessageEditText,typingHandler, handleSendMessage, handleUpdateMessage}) => {

    const inputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            messageEditing
                ? handleUpdateMessage()
                : handleSendMessage()
        }
    }

    return (
        <div className={styles.bottom__field}>
            <div className={styles.inputWrapper}>
                <input type="text"
                       onKeyPress={inputKeyPress}
                       value={messageEditing ? messageEditText : messageText}
                       onChange={
                           messageEditing
                               ? (e) => setMessageEditText(e.currentTarget.value)
                               : (e) => typingHandler(e)

                       }
                       placeholder={"Your message here.."}
                       autoFocus/>
                <IconButton>
                    <EmojiEmotions/>
                </IconButton>
            </div>
        </div>
    );
}

export default ChatFooterInputArea;