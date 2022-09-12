import React, {FC, useEffect, useState} from 'react';
import styles from './MessagesPage.module.scss';
import MessagesDialogs from "../MessagesDialogs/MessagesDialogs";
import MessagesChat from "../MessagesChat/MessagesChat";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {IUser} from "../../../models";
import {addTypingMan, deleteTypingMan} from "../../../store/chat/chat.slice";
import MessagesCreateSidebar from "../MessagesCreateSidebar/MessagesCreateSidebar";
import {getAllConversations} from "../../../store/chat/chat.actions";

const MessagesPage : FC = (props) => {

    const [dialogCreating,setDialogCreating] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const { socket } = useAppSelector( state => state.socket )
    const { data } = useAppSelector( state => state.chat.conversations )

    socket.off("typing").on("typing", (room : string, user : IUser) => {
        dispatch(addTypingMan({room,user}))
    })
    socket.off("stop-typing").on("stop-typing", (room : string,userId : string) => {
        dispatch(deleteTypingMan({room,userId}))
    })

    useEffect( () =>{
        if ( !data ) dispatch(getAllConversations())
    },[dispatch])

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {
                        dialogCreating
                            ? <MessagesCreateSidebar setDialogCreating={setDialogCreating}/>
                            : <MessagesDialogs setDialogCreating={setDialogCreating}/>
                    }

                </div>
                <div className={styles.right}>
                    <MessagesChat setDialogCreating={setDialogCreating}/>
                </div>
            </div>
        </section>
    );
}

export default MessagesPage;