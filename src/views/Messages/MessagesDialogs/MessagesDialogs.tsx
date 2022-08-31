import React, {FC, useEffect} from 'react';
import styles from './MessagesDialogs.module.scss';
import MessagesDialogsHeader from "../MessagesDialogsHeader/MessagesDialogsHeader";
import Dialog from "../../../components/layout/Dialog/Dialog";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getAllConversations} from "../../../store/chat/chat.actions";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";

interface IProps {
}

const MessagesDialogs: FC<IProps> = (props) => {

    const dispatch = useAppDispatch();
    const { conversations : { data, fetching }} = useAppSelector( state => state.chat)

    useEffect( () =>{
        dispatch(getAllConversations())
    },[dispatch])


    if (fetching) return <FullSectionLoader size={"small"}/>;
    return (
        <div className={styles.dialogs}>
            <MessagesDialogsHeader/>
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
                        return <Dialog key={el._id}/>
                    })
                }
            </div>
        </div>
    );
}

export default MessagesDialogs;