import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import styles from './MessagesDialogs.module.scss';
import MessagesDialogsHeader from "../MessagesDialogsHeader/MessagesDialogsHeader";
import Dialog from "../../../components/layout/Dialog/Dialog";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";

interface IProps {
    setDialogCreating : Dispatch<SetStateAction<boolean>>
}

const MessagesDialogs: FC<IProps> = ({ setDialogCreating }) => {

    const dispatch = useAppDispatch();
    const { conversations : { data, fetching }} = useAppSelector( state => state.chat)




    if (fetching) return <FullSectionLoader size={"small"}/>;
    return (
        <div className={styles.dialogs}>
            <MessagesDialogsHeader setDialogCreating={setDialogCreating}/>
            <div className={styles.dialodsItems}>
                {
                    data && data.length === 0 &&
                    <div className={styles.empty}>
                        <p className={styles.empty__title}>Your dialogs list is empty.</p>
                        <p className={styles.empty__link}>Create first dialog</p>
                    </div>
                }
                {
                    data && data.map( (el) =>{
                        return <Dialog dialog={el} key={el._id}/>
                    })
                }
            </div>
        </div>
    );
}

export default MessagesDialogs;