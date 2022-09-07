import React, {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from 'react';
import styles from './MessagesCreateSidebar.module.scss';
import {Avatar, Button, Chip, IconButton, Stack, TextField} from "@mui/material";
import {Close, PhotoCamera, SettingsOutlined} from "@mui/icons-material";
import {IUser} from "../../../models";
import {useAppDispatch, useAppSelector, useDialogCreate, useFetching, useFile} from "../../../utils/hooks";
import userService from "../../../services/user-service";
import MessagesCreateBarUser from "../MessagesCreateBarUser/MessagesCreateBarUser";
import {blue} from "@mui/material/colors";
import {createConversation} from "../../../store/chat/chat.actions";


interface IProps {
    setDialogCreating: Dispatch<SetStateAction<boolean>>
}

const MessagesCreateSidebar: FC<IProps> = ({setDialogCreating}) => {
    const dispatch = useAppDispatch()

    const [newChatName, setNewChatName] = useState<string>("");
    const [peopleSearchValue, setPeopleSearchValue] = useState<string>("");
    const [friends, setFriends] = useState<IUser[]>([])
    const [selectedPeople, setSelectedPeople] = useState<IUser[]>([]);
    const [chatAvatar, setChatAvatar] = useState<string>("");

    const [handleChangeAvatar, fetchingChatAvatar, errorChatAvatar] = useFile(data => setChatAvatar(data))
    const [dialogCreate,isLoading, dialogCreateError ] = useDialogCreate()

    const {user} = useAppSelector(state => state.auth)

    const [fetchFriends, isFriendsLoading, error] = useFetching(async () => {
        const {data} = await userService.getFriends(user!.userInfo!._id)
        setFriends(data)
    })

    useEffect(() => {
        fetchFriends()
    }, [])

    const filteredByName = useMemo(() =>{
        if (!friends) return []
        if ( !peopleSearchValue.length ) return friends;
        return friends.filter( el => el.username.indexOf(peopleSearchValue) !== -1)
    },[friends,peopleSearchValue])

    const addToSelected = (user: IUser) => {
        setSelectedPeople(prev => [user, ...prev])
    }
    const removeFromSelected = (id: string) => {
        setSelectedPeople(prev => prev.filter(person => person._id !== id))
    }
    const chatCreateHandler = async () => {
        await dispatch(createConversation({
            members : [...selectedPeople, user!.userInfo],
            image : chatAvatar,
            title : newChatName ? newChatName : [...selectedPeople, user!.userInfo].slice(0, 3).map(person => person.username).join(", "),
            creator : user!.userInfo,
            admins : [],
            isGroupChat : true,
        }));
        setDialogCreating(false)
    }
    const dialogCreateHandler = async () =>  {
        await dialogCreate(selectedPeople[0],user,false)
        setDialogCreating(false)
    }


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
                <div className={styles.top}>
                    {/*<h4>Chat avatar and title</h4>*/}
                    <div className={styles.avatarAndTitle}>
                        <IconButton color="primary" aria-label="upload picture" component="label"
                                    sx={{bgcolor: blue[100], width: 62, height: 62}}>
                            <input hidden accept="image/*" type="file" onChange={e => handleChangeAvatar(e)}/>
                            {chatAvatar
                                ? <Avatar src={"/images/" + chatAvatar} sx={{width: 62, height: 62}}/>
                                : <PhotoCamera/>
                            }
                        </IconButton>
                        <div className={styles.inputTitle}>
                            <input type="text" value={newChatName} onChange={e => setNewChatName(e.currentTarget.value)}
                                   placeholder={"Type here chat title"}/>
                            {
                                newChatName.length > 0 &&
                                <IconButton>
                                    <Close/>
                                </IconButton>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.invites}>
                    <div className={styles.search}>
                        <div className={styles.inputWrapper}
                             style={{flexWrap: selectedPeople.length === 0 ? "nowrap" : "wrap"}}>
                            {
                                selectedPeople.length > 0 && <Stack direction="row" spacing={1} className={styles.stack}>
                                    {
                                        selectedPeople.map((el) => {
                                            return <Chip
                                                key={el._id}
                                                sx={{ color : "var(--color-text-main)"}}
                                                onClick={() => removeFromSelected(el._id)}
                                                className={styles.chip}
                                                avatar={<Avatar alt="Natacha" src={"/images/" + el.profilePicture}/>}
                                                label={
                                                    <>
                                                        {el.username}
                                                        <IconButton className={styles.chipCloseBtn}>
                                                            <Close className={styles.chipCloseIcon}/>
                                                        </IconButton>
                                                    </>
                                                }
                                                variant="outlined"
                                            />
                                        })
                                    }
                                </Stack>
                            }
                            <input type="text" placeholder={"Введите имя или фамилию"} value={peopleSearchValue}
                                   onChange={(e) => setPeopleSearchValue(e.currentTarget.value)}/>
                            {
                                selectedPeople.length === 0 &&
                                <IconButton className={styles.erasor}
                                            style={{opacity: peopleSearchValue.length > 0 ? "1" : "0"}}>
                                    <Close/>
                                </IconButton>
                            }
                        </div>
                    </div>
                    <div className={styles.searchResults}>
                        {
                            filteredByName.length === 0 && <div className={styles.emptyFriends}>
                                <p>No friends was found..</p>
                            </div>
                        }
                        {
                            filteredByName.map((friend) => {
                                return (
                                    <MessagesCreateBarUser key={friend._id} user={friend}
                                                           addNewPerson={addToSelected}
                                                           removeFromSelected={removeFromSelected}
                                                           selectedPeople={selectedPeople}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footer__buttons}>
                    {!isCreateGroupChat && <Button variant={"contained"}
                                                   onClick={dialogCreateHandler}>Come to dialog</Button>}
                    {isCreateGroupChat && (
                        <Button onClick={chatCreateHandler} variant={"contained"}
                                disabled={selectedPeople.length === 0}>
                            Create chat</Button>)}
                    <Button variant={"outlined"} color={"info"}>Cancel</Button>
                </div>
                <IconButton>
                    <SettingsOutlined/>
                </IconButton>
            </div>
        </div>
    );
}

export default MessagesCreateSidebar;