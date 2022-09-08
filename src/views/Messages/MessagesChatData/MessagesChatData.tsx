import React, {FC, useEffect, useRef} from 'react';
import Message from "../../../components/layout/Message/Message";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getMessages} from "../../../store/chat/chat.actions";
import styles from './MessagesChatData.module.scss';
import {IUser} from "../../../models";
import {TransitionGroup} from "react-transition-group";
import {Collapse} from "@mui/material";


interface IProps {
}

const MessagesChatData: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>();

    const {user} = useAppSelector(state => state.auth)
    const {data: messages, fetching, error} = useAppSelector(state => state.chat.messages)
    const {currentConversation, previousConversation} = useAppSelector(state => state.chat.conversations)
    const {socket} = useAppSelector(state => state.socket)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    useEffect(() => {
        if (currentConversation) {
            (async () => {
                if (!messages[currentConversation._id]) dispatch(getMessages(currentConversation._id))
                socket.emit("")
            })()
            socket.emit("leave-room", previousConversation?._id)
            socket.emit("join-room", currentConversation._id)
        }
    }, [currentConversation])

    return (
        <div className={styles.chatData}>
            <TransitionGroup>
                {
                    currentConversation && messages[currentConversation._id] && messages[currentConversation._id].map((message) => {
                        return (
                            <Collapse key={message._id}>
                                <Message message={message}
                                         isOwner={(message.sender as IUser)._id === user!.userInfo!._id}/>
                            </Collapse>
                        )
                    })
                }
            </TransitionGroup>
        </div>
    );
}

export default MessagesChatData;