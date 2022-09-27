import React, {FC} from 'react';
import styles from "../../MessagesDialogs/MessagesDialogs.module.scss";
import Dialog from "../../../../components/layout/Dialog/Dialog";
import {IConversation} from "../../../../models";


interface IProps {
    dialogs: IConversation[] | null
}

const DialogsList: FC<IProps> = ({ dialogs }) => {
    return (
        <div className={styles.dialodsItems}>
            {
                dialogs && dialogs.length === 0 &&
                <div className={styles.empty}>
                    <p className={styles.empty__title}>Your dialogs list is empty.</p>
                    <p className={styles.empty__link}>Create first dialog</p>
                </div>
            }
            {
                dialogs && dialogs.map( (dialog) =>{
                    return <Dialog dialog={dialog} key={dialog._id}/>
                })
            }
        </div>
    );
}

export default DialogsList;