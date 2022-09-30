import React, {FC, useEffect, useState} from 'react';
import styles from './MessagesChatFooter.module.scss'
import {IconButton} from "@mui/material";
import {Attachment, CheckCircleRounded, Close, Edit, EmojiEmotions, Send} from "@mui/icons-material";
import {IConversation, IMessage, IUser, UserDto} from "../../../models";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../utils/hooks";
import {CreateMessageModel} from "../../../models/message.model";
import {createMessage, updateOurMessage} from "../../../store/chat/chat.actions";
import {changeMessageEditing} from "../../../store/chat/chat.slice";
import ChatFooterInputArea from "./ChatFooterInputArea/ChatFooterInputArea";

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
    const [isTyping, setIsTyping] = useState(false); // am i typing
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        setMessageEditText(messageEditingData?.text ?? "")
    }, [messageEditingData])


    const typingHandler = () => {
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
            const result = await dispatch(createMessage({message: newMessage}));
            if (result.meta.requestStatus === "fulfilled") {
                socket.emit("message-room", result.payload)
            }
            setMessageText("")
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
                    conversation: currentConversation
                })
            }
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
                    <IconButton onClick={() => dispatch(changeMessageEditing(false))}>
                        <Close/>
                    </IconButton>
                </div>
            }
            <div className={styles.bottom}>
                <IconButton>
                    <Attachment/>
                </IconButton>
                <ChatFooterInputArea messageEditing={messageEditing} handleUpdateMessage={handleUpdateMessage}
                                     handleSendMessage={handleSendMessage} messageEditText={messageEditText}
                                     messageText={messageText} setMessageEditText={setMessageEditText}
                                     typingHandler={typingHandler} setMessageText={setMessageText}
                />
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