import React, {FC} from 'react';
import styles from './MessagesDialogsHeader.module.scss'
import {Button} from "@mui/material";
import {CreateOutlined, SearchRounded} from "@mui/icons-material";

interface IProps {
}

const MessagesDialogsHeader: FC<IProps> = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.field}>
                <SearchRounded/>
                <input type="text" placeholder={"Search for a person..."}/>
            </div>
            <Button variant="outlined" startIcon={<CreateOutlined />}>
                Create
            </Button>
        </div>
    );
}

export default MessagesDialogsHeader;