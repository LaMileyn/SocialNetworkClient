import React, {FC, useEffect, useRef} from 'react';
import Message from "../../../components/layout/Message/Message";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getMessages} from "../../../store/chat/chat.actions";
import styles from './MessagesChatData.module.scss';

interface IProps {
}

const MessagesChatData: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>();
    const { data : messages , fetching, error } = useAppSelector( state => state.chat.messages )
    const {  currentConversation, previousConversation  } = useAppSelector( state => state.chat.conversations )
    const { socket } = useAppSelector( state => state.socket )

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    useEffect( () =>{
        if (currentConversation){
            // getting messages
            ( async () =>{
                if (!messages[currentConversation._id]) dispatch(getMessages(currentConversation._id))
                socket.emit("")
            })()
            socket.emit("leave-room", previousConversation?._id)
            socket.emit("join-room", currentConversation._id)
        }
    },[currentConversation])

    return (
        <div className={styles.chatData}>
            {
                // currentConversation && messages &&  messages[currentConversation._id]
                [...Array(10)].map( (message) =>{
                    return(
                        <Message message={message} key={message}/>
                    )
                })
            }
        </div>
    );
}

export default MessagesChatData;