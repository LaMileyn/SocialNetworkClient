import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "../MessagesCreateSidebar.module.scss";
import {Avatar, IconButton} from "@mui/material";
import {blue} from "@mui/material/colors";
import {Close, PhotoCamera} from "@mui/icons-material";


interface IProps {
    handleChangeAvatar : (e : React.ChangeEvent<HTMLInputElement>) => void,
    chatAvatar : string,
    newChatName : string,
    setNewChatName : Dispatch<SetStateAction<string>>
}

const MessagesCreateBarTop: FC<IProps> = ({ handleChangeAvatar, chatAvatar, newChatName,setNewChatName }) => {

    return (
        <div className={styles.top}>
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
    );
}

export default React.memo(MessagesCreateBarTop);