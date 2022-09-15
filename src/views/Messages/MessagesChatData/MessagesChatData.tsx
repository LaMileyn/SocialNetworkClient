import React, {FC, useEffect, useRef} from 'react';
import Message from "../../../components/layout/Message/Message";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getMessages} from "../../../store/chat/chat.actions";
import styles from './MessagesChatData.module.scss';
import {IConversation, IMessage, IUser} from "../../../models";
import {TransitionGroup} from "react-transition-group";
import {Collapse} from "@mui/material";
import {addNewMessage, clearSelectedMessages, deleteChatMessages, updateMessage} from "../../../store/chat/chat.slice";


interface IProps {
}

const MessagesChatData: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);

    const {user} = useAppSelector(state => state.auth)
    const {data: messages, fetching, error} = useAppSelector(state => state.chat.messages)
    const {currentConversation, previousConversation} = useAppSelector(state => state.chat.conversations)
    const {socket} = useAppSelector(state => state.socket)

    useEffect(() => {
        setTimeout( () =>{ scrollRef.current?.scrollIntoView({behavior: "smooth"}) },300)
    }, [messages,currentConversation])

    useEffect(() => {
        if (currentConversation) {
            (async () => {
                if (!messages[currentConversation._id]) dispatch(getMessages(currentConversation._id))
                socket.emit("")
            })()
            socket.emit("leave-room", previousConversation?._id)
            socket.emit("join-room", currentConversation._id)
        }
        dispatch(clearSelectedMessages())
    }, [currentConversation])

    socket.off("room-messages").on("room-messages", ( data : IMessage) => {
        // check if this message from current our room or not --> of not = notifications ++
        console.log(data)
        if (!currentConversation || currentConversation?._id !== (data.conversation as IConversation)._id) {
            console.log("notification")
        }
        dispatch(addNewMessage({
            conversation : data.conversation as IConversation,
            message : data,
            fromMe : false
        }))
    })
    socket.off("room-message-update").on("room-message-update",(data : IMessage) =>{
        const isLast = (currentConversation?.lastMessage as IMessage)._id === data._id;
        console.log(data)
        dispatch(updateMessage({
             fromMe : false,
             isLast,
             updatedMessage : data
        }))
    })
    socket.off("room-message-delete").on("room-message-delete", (data : {
        messagesToDelete : IMessage[],
        conversation : IConversation,
        sender : IUser
    }) =>{
        dispatch(deleteChatMessages({
             messages : data.messagesToDelete,
             fromMe : false
        }))
    })


    return (
        <div className={styles.chatData} >
            <TransitionGroup>
                {
                    currentConversation && messages[currentConversation._id] && messages[currentConversation._id].map((message) => {
                        return (
                            <Collapse key={message._id}  ref={scrollRef}>
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