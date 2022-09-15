import React, {FC, useEffect, useState} from 'react';
import styles from './MessagesChatFooter.module.scss'
import {IconButton} from "@mui/material";
import {Attachment, CheckCircleRounded, Close, Edit, EmojiEmotions, Send} from "@mui/icons-material";
import {IConversation, IMessage, IUser, UserDto} from "../../../models";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {CreateMessageModel} from "../../../models/message.model";
import {createMessage, updateOurMessage} from "../../../store/chat/chat.actions";
import {changeMessageEditing} from "../../../store/chat/chat.slice";

interface IProps {
    currentConversation: IConversation,
    sender: IUser
}

const MessagesChatFooter: FC<IProps> = ({currentConversation, sender}) => {
    const dispatch = useAppDispatch();
    const {socket} = useAppSelector(state => state.socket)
    const {messages: {messageEditing, messageEditingData}} = useAppSelector(state => state.chat)

    const [messageText, setMessageText] = useState("");
    const [messageEditText, setMessageEditText] = useState("");
    const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(false);
    const [isEmoji, setIsEmoji] = useState(false)
    const [isTyping, setIsTyping] = useState(false); // am i typing
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect( () =>{
        setMessageEditText(messageEditingData?.text ?? "")
    },[messageEditingData])

    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.currentTarget.value);
        if (!socket) return;
        if (!isTyping) {
            setIsTyping(true)
            socket.emit("typing", currentConversation._id, sender._id)
        }
        if (timer) clearTimeout(timer)
        setTimer(setTimeout(() => {
            socket.emit("stop-typing", currentConversation._id, sender._id)
            setIsTyping(false)
        }, 3000))
    }
    const handleSendMessage = async () => {
        if (messageText.trim()) {
            const newMessage: CreateMessageModel = {
                sender,
                conversation: currentConversation,
                text: messageText,
                updated: false,
            }
            setIsTyping(false)
            socket.emit("stop-typing", currentConversation._id, sender._id)
            setIsSendBtnDisabled(true)
            const result = await dispatch(createMessage({message: newMessage}));
            if (result.meta.requestStatus === "fulfilled") {
                socket.emit("message-room", result.payload)
            }
            setMessageText("")
            setIsSendBtnDisabled(false)
        }
    }
    const handleUpdateMessage = async () => {
        if (messageEditText.length > 0) {
            const newOne: CreateMessageModel = {
                updated: true,
                text: messageEditText,
                sender,
                conversation: currentConversation
            }
            const isLast = (currentConversation.lastMessage as IMessage)._id === messageEditingData?._id;
            const result = await dispatch(updateOurMessage({newOne, isLast, id: messageEditingData!._id}))
            if (result.meta.requestStatus === "fulfilled") {
                socket.emit("message-update", {
                    ...result.payload as IMessage,
                    conversation : currentConversation
                })
            }
        }
    }
    const inputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            messageEditing
                ? handleUpdateMessage()
                : handleSendMessage()
        }
    }

    return (
        <div className={styles.footer}>
            {
                messageEditing && <div className={styles.messageEdit}>
                <span>
                    <Edit/>
                    Message Editing
                </span>
                    <IconButton onClick={ () => dispatch(changeMessageEditing(false))}>
                        <Close/>
                    </IconButton>
                </div>
            }
            <div className={styles.bottom}>
                <div className={styles.bottom__attachBtn}>
                    <IconButton>
                        <Attachment/>
                    </IconButton>
                </div>
                <div className={styles.bottom__field}>
                    <div className={styles.inputWrapper}>
                        <input type="text"
                               onKeyPress={inputKeyPress}
                               value={ messageEditing ? messageEditText : messageText}
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
                <div className={styles.bottom__send}>
                    {
                        messageEditing
                            ? <IconButton>
                                <CheckCircleRounded onClick={handleUpdateMessage}/>
                            </IconButton>
                            : <IconButton onClick={handleSendMessage}>
                                <Send/>
                            </IconButton>
                    }

                </div>
            </div>
        </div>
    );
}

export default MessagesChatFooter;