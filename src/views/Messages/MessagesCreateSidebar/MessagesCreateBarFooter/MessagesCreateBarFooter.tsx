import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "../MessagesCreateSidebar.module.scss";
import {Button, IconButton} from "@mui/material";
import {SettingsOutlined} from "@mui/icons-material";
import {IUser} from "../../../../models";


interface IProps {
    isCreateGroupChat: boolean,
    dialogCreateHandler: () => void,
    chatCreateHandler : () => void,
    selectedPeople : IUser[],
    setDialogCreating: Dispatch<SetStateAction<boolean>>
}

const MessagesCreateBarFooter: FC<IProps> =
    ({isCreateGroupChat,dialogCreateHandler,chatCreateHandler,selectedPeople, setDialogCreating}) => {

    return (
        <div className={styles.footer}>
            <div className={styles.footer__buttons}>
                {!isCreateGroupChat && <Button variant={"contained"}
                                               onClick={dialogCreateHandler}>Come to dialog</Button>}
                {isCreateGroupChat && (
                    <Button onClick={chatCreateHandler} variant={"contained"}
                            disabled={selectedPeople.length === 0}>
                        Create chat</Button>)}
                <Button variant={"outlined"} color={"info"} onClick={() => setDialogCreating(false)}>Cancel</Button>
            </div>
            <IconButton>
                <SettingsOutlined/>
            </IconButton>
        </div>
    );
}

export default React.memo(MessagesCreateBarFooter);