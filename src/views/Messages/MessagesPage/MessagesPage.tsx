import React, {FC, useState} from 'react';
import styles from './MessagesPage.module.scss';
import MessagesDialogs from "../MessagesDialogs/MessagesDialogs";
import MessagesChat from "../MessagesChat/MessagesChat";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {IUser} from "../../../models";
import {addTypingMan, deleteTypingMan} from "../../../store/chat/chat.slice";

const MessagesPage : FC = (props) => {

    const [dialogCreating,setDialogCreating] = useState<boolean>(false)
    const { socket } = useAppSelector( state => state.socket )
    const dispatch = useAppDispatch();

    socket.off("typing").on("typing", (room : string, user : IUser) => {
        dispatch(addTypingMan({room,user}))
    })
    socket.off("stop-typing").on("stop-typing", (room : string,userId : string) => {
        dispatch(deleteTypingMan({room,userId}))
    })

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {
                        dialogCreating
                            ? <MessagesDialogs/>
                            : <MessagesDialogs/>
                    }

                </div>
                <div className={styles.right}>
                    <MessagesChat/>
                </div>
            </div>
        </section>
    );
}

export default MessagesPage;