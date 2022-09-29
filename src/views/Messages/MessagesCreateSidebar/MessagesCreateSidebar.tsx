import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react';
import styles from './MessagesCreateSidebar.module.scss';
import {Avatar, Button, Chip, IconButton, Stack, TextField} from "@mui/material";
import {Close, PhotoCamera, SettingsOutlined} from "@mui/icons-material";
import {IUser} from "../../../models";
import {useAppDispatch, useAppSelector, useDialogCreate, useFetching, useFile} from "../../../utils/hooks";
import userService from "../../../services/user-service";
import MessagesCreateBarUser from "../MessagesCreateBarUser/MessagesCreateBarUser";
import {blue} from "@mui/material/colors";
import {createConversation} from "../../../store/chat/chat.actions";
import MessagesCreateBarTop from "./MessagesCreateBarTop/MessagesCreateBarTop";
import MessagesCreateBarUsers from "./MessagesCreateBarUsers/MessagesCreateBarUsers";
import MessagesCreateBarFooter from "./MessagesCreateBarFooter/MessagesCreateBarFooter";


interface IProps {
    setDialogCreating: Dispatch<SetStateAction<boolean>>
}

const MessagesCreateSidebar: FC<IProps> = ({setDialogCreating}) => {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)

    const [chatAvatar, setChatAvatar] = useState<string>("");
    const [newChatName, setNewChatName] = useState<string>("");
    const [selectedPeople, setSelectedPeople] = useState<IUser[]>([]);

    const [handleChangeAvatar, fetchingChatAvatar, errorChatAvatar] = useFile(data => setChatAvatar(data))
    const [dialogCreate, isLoading, dialogCreateError] = useDialogCreate()

    const addToSelected = useCallback((user: IUser) => {
        setSelectedPeople(prev => [user, ...prev])
    } ,[])
    const removeFromSelected = useCallback( (id: string) => {
        setSelectedPeople(prev => prev.filter(person => person._id !== id))
    },[])

    const chatCreateHandler = useCallback( async () => {
        await dispatch(createConversation({
            members: [...selectedPeople, user!.userInfo],
            image: chatAvatar,
            title: newChatName ? newChatName : [...selectedPeople, user!.userInfo].slice(0, 3).map(person => person.username).join(", "),
            creator: user!.userInfo,
            admins: [],
            isGroupChat: true,
        }));
        setDialogCreating(false)
    },[selectedPeople,newChatName,user])

    const dialogCreateHandler = useCallback( async () => {
        await dialogCreate(selectedPeople[0], user, false)
        setDialogCreating(false)
    },[selectedPeople,user])

    const isCreateGroupChat = useMemo(() => {
        if (newChatName) return true;
        return selectedPeople.length !== 1;
    }, [selectedPeople, newChatName])


    return (
        <div className={styles.createBar}>
            <div className={styles.header}>
                <span>Chat creating</span>
                <IconButton onClick={() => setDialogCreating(prev => !prev)}>
                    <Close/>
                </IconButton>
            </div>
            <div className={styles.body}>
                <MessagesCreateBarTop chatAvatar={chatAvatar} handleChangeAvatar={handleChangeAvatar}
                                      newChatName={newChatName} setNewChatName={setNewChatName}/>
                <MessagesCreateBarUsers removeFromSelected={removeFromSelected} addToSelected={addToSelected}
                                        selectedPeople={selectedPeople} user={user}/>
            </div>
            <MessagesCreateBarFooter isCreateGroupChat={isCreateGroupChat} chatCreateHandler={chatCreateHandler}
                                     dialogCreateHandler={dialogCreateHandler} selectedPeople={selectedPeople}
                                     setDialogCreating={setDialogCreating}
            />
        </div>
    );
}

export default MessagesCreateSidebar;