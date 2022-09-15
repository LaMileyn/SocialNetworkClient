import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {changeMessageEditing, clearSelectedMessages, setEditingMessageData} from "../../../../store/chat/chat.slice";
import {CloseOutlined} from "@mui/icons-material";
import styles from './HeaderSelectedMessages.module.scss';
import {IMessage, UserDto} from "../../../../models";
import {deleteMessages} from "../../../../store/chat/chat.actions";


interface IProps {
    selectedMessages: IMessage[],
    user : UserDto | null
}

const HeaderSelectedMessages: FC<IProps> = ({selectedMessages, user}) => {
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector(state => state.socket)
    const {  currentConversation } = useAppSelector(state => state.chat.conversations)

    const handleUpdate = () =>{
        dispatch(setEditingMessageData(selectedMessages[0]));
        dispatch(changeMessageEditing(true))
        dispatch(clearSelectedMessages)
    }
    const handleDelete = () =>{
        dispatch(deleteMessages({ messages : selectedMessages }))
        let toWebSocket = {
            messagesToDelete : selectedMessages,
            conversation : currentConversation,
            sender : user!.userInfo
        };
        socket.emit("message-delete",toWebSocket)
    }

    return (
        <>
            <div className={styles.left}>
                <Button
                    onClick={() => dispatch(clearSelectedMessages())}
                    variant={"outlined"}
                    endIcon={<CloseOutlined/>}>{selectedMessages.length} сообщений</Button>
            </div>
            <div className={styles.right}>
                { selectedMessages.length === 1 && <Button variant={"outlined"} style={{ color : "var(--color-primary)"}} onClick ={handleUpdate}>Update</Button> }
                <Button variant={"contained"} style={{ background : "var(--color-red-low)"}} onClick = {handleDelete}>Delete</Button>
            </div>

        </>
    );
}

export default HeaderSelectedMessages;