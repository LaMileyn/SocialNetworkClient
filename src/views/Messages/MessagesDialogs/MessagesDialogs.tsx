import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import styles from './MessagesDialogs.module.scss';
import MessagesDialogsHeader from "../MessagesDialogsHeader/MessagesDialogsHeader";
import {useAppSelector} from "../../../utils/hooks";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";
import DialogsList from "../MessagesDialogsHeader/DialogsList/DialogsList";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}

const MessagesDialogs: FC<IProps> = ({ setDialogCreating }) => {

    const { conversations : { data, fetching }} = useAppSelector( state => state.chat)

    if (fetching) return <FullSectionLoader size={"small"}/>;
    return (
        <div className={styles.dialogs}>
            <MessagesDialogsHeader setDialogCreating={setDialogCreating}/>
            <DialogsList dialogs={data}/>
        </div>
    );
}

export default MessagesDialogs;