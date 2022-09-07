import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './MessagesDialogsHeader.module.scss'
import {Button} from "@mui/material";
import {CreateOutlined, SearchRounded} from "@mui/icons-material";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}

const MessagesDialogsHeader: FC<IProps> = ({ setDialogCreating }) => {
    return (
        <div className={styles.header}>
            <div className={styles.field}>
                <SearchRounded/>
                <input type="text" placeholder={"Search for a person..."}/>
            </div>
            <Button variant="outlined" startIcon={<CreateOutlined />} onClick={ () => setDialogCreating( prev => !prev)}>
                Create
            </Button>
        </div>
    );
}

export default MessagesDialogsHeader;