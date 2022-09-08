import React, {FC, useEffect, useRef} from 'react';
import Message from "../../../components/layout/Message/Message";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getMessages} from "../../../store/chat/chat.actions";
import styles from './MessagesChatData.module.scss';
import {IConversation, IMessage, IUser} from "../../../models";
import {TransitionGroup} from "react-transition-group";
import {Collapse} from "@mui/material";
import {addNewMessage, updateMessage} from "../../../store/chat/chat.slice";


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