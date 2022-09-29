import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import styles from './MessagesDialogs.module.scss';
import MessagesDialogsHeader from "../MessagesDialogsHeader/MessagesDialogsHeader";

import DialogsList from "../MessagesDialogsHeader/DialogsList/DialogsList";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}

const MessagesDialogs: FC<IProps> = ({ setDialogCreating }) => {

    return (
        <div className={styles.dialogs}>
            <MessagesDialogsHeader setDialogCreating={setDialogCreating}/>
            <DialogsList />
        </div>
    );
}

export default MessagesDialogs;